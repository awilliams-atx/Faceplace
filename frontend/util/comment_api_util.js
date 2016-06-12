var ServerActions = require('../actions/server_actions');

var CommentApiUtil = {
  fetchComments: function (opts) {
    var url = 'api/';

    if (opts.commentable_type === 'Post') {
      url += 'posts/' + opts.commentable_id + '/comments';
    } else if (opts.commentable_type === 'Comment') {
      url += 'comments/' + opts.commentable_id + '/comments';
    }

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function (comments) {
        ServerActions.receiveComments(comments);
      }
    });
  },
  submitComment: function (comment) {

    var submissionComment = {};

    submissionComment.body = comment.body;
    submissionComment.commentable_id = comment.commentableId;
    submissionComment.commentable_type = comment.commentableType;

    var parentRoute,
        parentId;

    if (comment.commentableType === 'Post') {
      parentRoute = 'posts';
      parentId = comment.commentableId;
    } else if (comment.commentableType === 'Comment') {
      parentRoute = 'comments';
      parentId = comment.commentableId;
    }

    var url = 'api/' + parentRoute + '/' + parentId + '/comments';

    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: {comment: submissionComment},
      success: function (comment) {
        ServerActions.receiveComment(comment);
      },
      error: function (errors) {
        console.log('CommentApiUtil#submitComment ERROR');
      }
    });
  }
};

module.exports = CommentApiUtil;