export type Message = {
  event: string
  data?: any
  callback?: string
}

export interface PluginMessageEvent {
  pluginMessage: Message
  pluginId?: string
}

export interface EventTS {
  hello: {
    string: string
    num: number
  }
  helloCallback: {
    result: boolean
  }

  getSelection: null
  getSelectionCallback: {
    selection: { name: string; children: number }[]
  }
}
