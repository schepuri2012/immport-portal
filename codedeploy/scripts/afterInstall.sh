#!/bin/bash
APP_USER=ec2-user
CODEDEPLOY_DIR=/home/$APP_USER/codedeploy_work_dir
APPS_DIR=/home/$APP_USER/apps

if [ -d ${CODEDEPLOY_DIR} ] ; then
    if [ "$(ls -A ${CODEDEPLOY_DIR})" ]; then
        cd ${CODEDEPLOY_DIR}
        ZIP_FILE=`ls -t *.zip | head -1`
        echo $ZIP_FILE
        mv ${ZIP_FILE} ${APPS_DIR}/.
        chown $APP_USER:$APP_USER ${APPS_DIR}/${ZIP_FILE}
    fi
fi 

echo "cd to the apps directory"
cd ${APPS_DIR}

if [ -f "$ZIP_FILE" ]; then
    echo "$ZIP_FILE exist"
    unzip -o $ZIP_FILE
    chown -R $APP_USER:$APP_USER ${ZIP_FILE%.*}
    echo "Creating a symbolic link "${APPLICATION_NAME}" to ${ZIP_FILE%.*}"
    ln -s ${ZIP_FILE%.*} ${APPLICATION_NAME}
fi

exit 0
