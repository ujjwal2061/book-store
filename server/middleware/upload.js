exports.BookImage = asyunc = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "File not uploaded !",
      });
    }
    const bookurl = req.file.path;
    console.log(bookurl);
    res.json({ link: bookurl });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      err: err.error || "Internal Server Error",
    });
  }
};


