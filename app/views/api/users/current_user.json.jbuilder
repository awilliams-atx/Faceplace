json.id @user.id
json.first_name @user.first_name
json.last_name @user.last_name
json.postPicUrl asset_path(@user.profile_pic.url)
json.profile_pic_url asset_path(@user.profile_pic.url)
json.friends @user.friends.pluck(:id)
json.developerId @developer.id
