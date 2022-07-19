
export interface WebsocketMessage {
    type: 'image' | 'video' | 'clear'
    url?: string
}
