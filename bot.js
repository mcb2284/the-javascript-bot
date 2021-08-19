const config = require('./config')
const twit =  require('twit')

const T = new twit(config)

let retweetUsers = async function(userId) {
    try {
      const { data } = await T.get("users/show", {
        user_id: userId
      });
      const status = data.status;
      // make sure tweet isn't in reply to another user
      if (status.in_reply_to_status_id == null) {
        const response = await T.post("statuses/retweet/:id", {
          id: status.id_str
        });
        if (response) {
          console.log("Successfully retweeted");
        }
      }
    } catch (err) {
      // catch all log if the search/retweet could not be executed
      console.error("Err:", err);
    }
  }



// Run every 60 seconds
setInterval(function() { retweetUsers("983832250608386048"); }, 60000);
setInterval(function() { retweetUsers('1266042806319099904'); }, 60000);
setInterval(function() { retweetUsers('1331320690490961921'); }, 60000);