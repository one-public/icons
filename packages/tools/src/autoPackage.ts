import {
  IconSet,
  bumpVersion,
  execAsync,
  exportJSONPackage,
  getNPMVersion,
} from '@iconify/tools'
import { readFileSync } from 'node:fs'
import { iconsPath } from './config'

export function getIconJsonPackageInfo() {
  const packageString = readFileSync(`${iconsPath}/package.json`, 'utf-8')
  const { name, description, version } = JSON.parse(packageString)
  return {
    target: iconsPath,
    name,
    description,
    version,
  }
}

/**
 *  获取包的上一个版本,进行比较，生成项目并且发布
 * @param iconSet
 */
export default async function (
  iconSet: IconSet,
  options: Record<string, any> & {
    customFiles: Record<string, string>
  },
) {
  const packageInfo = getIconJsonPackageInfo()
  const { target, name, description } = packageInfo

  let { version } = packageInfo

  // 获取包的版本
  const res = await getNPMVersion({
    package: name,
  }).catch(() => ({
    version: version,
  }))

  console.log(`${name} 当前版本是: ${version}`)

  // 更新版本
  version = bumpVersion(res.version)

  console.log(`${name} 准备生成, 新版本是: ${version}`)

  // 生成图标项目
  await exportJSONPackage(iconSet, {
    target,
    package: {
      name: name,
      version,
      description,
    },
    customFiles: options.customFiles,
  })

  console.log(`${name} 生成完成, 当前版本是: ${version}`)

  console.log(`${name} 准备推送到npm仓库`);

  await execAsync('npm publish --access=public --silent', {
    cwd: target,
  });

  console.log(`${name} 推送成功, 新版本是: ${version}`);
}
