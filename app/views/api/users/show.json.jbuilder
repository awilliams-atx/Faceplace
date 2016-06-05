json.userId @user.id
json.firstName @user.first_name
json.lastName @user.last_name
json.description @user.description
json.company @user.company
json.position @user.position
json.location @user.location
json.hometown @user.hometown
json.school @user.school
json.major @user.major
json.coverPhotoUrl asset_path(@user.cover_photo.url(:cover))
json.alreadyFriends @user.friends_with?(current_user.id)
json.requestMade @user.has_pending_request_for?(current_user.id)
json.requestReceived @user.has_pending_request_from?(current_user.id)
