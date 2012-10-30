#! /bin/bash

repo_dir=/home/joelgkinney/fortpoint.me
static_src=$repo_dir/flask.fortpoint.me/static/
static_dest=/home/joelgkinney/webapps/static/
remote_name=origin
branch_name=master

if [ $1 ]; then
    branch_name=$1
fi

cd $repo_dir
git fetch $remote_name
git checkout $remote_name/$branch_name

# Update static assets
# Delete existing media.
rm -rf $static_dest*
# Copy over media from project.
cp -R $static_src* $static_dest

# Restart Apache
/home/joelgkinney/webapps/fpl_flask/apache2/bin/restart
