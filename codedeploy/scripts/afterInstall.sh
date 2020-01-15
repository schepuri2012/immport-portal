#!/bin/bash
APP_USER=ec2-user
CODEDEPLOY_DIR=/home/$APP_USER/codedeploy
APPS_DIR=/home/$APP_USER/apps


if [ -d ${CODEDEPLOY_DIR} ] ; then
    if [ "$(ls -A ${CODEDEPLOY_DIR})" ]; then
        ZIP_FILE = $(basename "${CODEDEPLOY_DIR}/*.zip") 
        echo "ZIP FILE"
        echo $ZIP_FILE
        mv ${CODEDEPLOY_DIR}/*.zip ${APPS_DIR}/.
    fi
fi 

echo "cd to the apps directory"
cd ${APPS_DIR}

echo "Reading the latest Zip filename"
LATEST_ZIP=`ls -t *.zip | head -1`
echo $LATEST_ZIP

if [ -f "$LATEST_ZIP" ]; then
    echo "$LATEST_ZIP exist"
    unzip $LATEST_ZIP
    chown -R ec2-user:ec2-user ${LATEST_ZIP%.*}
    echo "Creating symbolic link for ${LATEST_ZIP%.*}"
    ln -s ${LATEST_ZIP%.*} $APPLICATION_NAME
fi
