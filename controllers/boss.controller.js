const BossModel = require("../models/boss.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.createBoss = async (req, res) => {  
  const newBoss = new BossModel({
    raidId: req.body.raidId,
    bossName: req.body.bossName,
    bossType: req.body.bossType,
    bossLife: req.body.bossLife,
    bossLevel: req.body.bossLevel
  });

  try {
    const Boss = await newBoss.save();
    return res.status(201).json(Boss);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.readBoss = (req, res) => {
  BossModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error - no existing data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.updateBoss = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    bossName: req.body.bossName,
    bossType: req.body.bossType,
    bossLife: req.body.bossLife,
    bossLevel: req.body.bossLevel
  };

  BossModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error Update : " + err);
    }
  );
};

module.exports.deleteBoss = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  BossModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to delete post : " + err);
  });
};

module.exports.commentBoss = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return BossModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.editCommentBoss = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return BossModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentBoss = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return BossModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
