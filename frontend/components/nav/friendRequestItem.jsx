var React = require('react');

var friendRequestItem = function (req, idx) {
  return (
    <div className='friend-request-item group' key={idx}>
      <div className='friend-request-item-pic nav-drop-block'>
        <img src={req.profile_pic_url} />
      </div>
      <div className='friend-request-details nav-drop-block'>
        <a href={'#/users/' + req.user_id}>{req.name}</a>
        <aside>a million friends</aside>
      </div>
      <div className='friend-request-response'>
        <button className='nav-drop-request-confirm'>Confirm</button>
        <button className='nav-drop-request-delete'>Delete Request</button>
      </div>
    </div>
  );
};

module.exports = friendRequestItem;