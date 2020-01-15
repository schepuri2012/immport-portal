#!/bin/bash
APP_USER=ec2-user
CODEDEPLOY_DIR=/home/$APP_USER/codedeploy_work_dir
APPS_DIR=/home/$APP_USER/apps

echo "cd AWS CodeDeploy work directory"
if cd ${CODEDEPLOY_DIR} ; then
    {
        set -e
        ZIP_FILE=`ls -t *.zip | head -1`
        echo $ZIP_FILE
        mv ${ZIP_FILE} ${APPS_DIR}/.
        chown $APP_USER:$APP_USER ${APPS_DIR}/${ZIP_FILE}
    }
else 
    error_exit "AWS CodeDeploy work directory is missing! Aborting."
fi

echo "cd to the apps directory"
if cd /home/$APP_USER/apps/; then
    if [ -f "$ZIP_FILE" ]; then
        {
            set -e
            echo "$ZIP_FILE exist"
            unzip -o $ZIP_FILE
            chown -R $APP_USER:$APP_USER ${ZIP_FILE%.*}
            echo "Creating a symbolic link "${APPLICATION_NAME}" to ${ZIP_FILE%.*}"
            ln -s ${ZIP_FILE%.*} ${APPLICATION_NAME}
        }
    else 
        error_exit "Zip file artifact is missing! Aborting."    
    fi
else 
    error_exit "~/apps directory is missing! Aborting."
fi

error_exit()
{
	echo "$1" 1>&2
	exit 1
}

exit 0
