export default async function handler(req, res) {
    global.broadcastToClients?.({
      type: 'MESSAGE',
      content: 'This is a message from server!',
    });
  
    res.status(200).json({ success: true });
  }  