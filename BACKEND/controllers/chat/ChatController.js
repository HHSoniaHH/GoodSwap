const chatModel = require("../../models/chatModel");

//----------------------------------------Creer un conversation---------------------------------------
exports.createChat = async (req, res) => {
  const OldChat = await chatModel.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });

  if (req.body.senderId === req.body.receiverId)
    return res.json({ success: false, message: "The same user" });
  if (OldChat)
    return res.json({
      success: false,
      message: "Chat already exists. Access your message box",
    });

  const newChat = new chatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//----------------------------------------Recuperer les conversations d'un utilisateur---------------------------------------
exports.userChats = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
//----------------------------------------Recuperer une conversation d'un utilisateur avec un autre---------------------------------------
exports.findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
