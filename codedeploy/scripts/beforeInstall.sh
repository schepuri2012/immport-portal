#!/bin/bash
echo "AWS CodeDeploy ${LIFECYCLE_EVENT} script running as user ${USER}"

APP_USER=ec2-user
CODEDEPLOY_DIR=/home/$APP_USER/codedeploy_work_dir 

if [ -d ${CODEDEPLOY_DIR} ]
then
    cd ${CODEDEPLOY_DIR}
    rm -rf ${CODEDEPLOY_DIR}
    mkdir ${CODEDEPLOY_DIR}
else
    mkdir ${CODEDEPLOY_DIR}
fi 

echo "cd to the apps directory"
cd /home/$APP_USER/apps/

if [ -L ${APPLICATION_NAME} ] ; then
    if [ -e ${APPLICATION_NAME} ] ; then
        echo "Reading the target file of the current symbolic link"
        target_file=`readlink -f $APPLICATION_NAME` 
        echo $target_file

        echo "if the applicatio is running"
        echo "Stop the application"
        /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME status
        /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME stop
        
        echo "Back up previous application zip file"
        mv -f "${target_file}.zip" "${target_file}.zip.bkp"

        echo "Back up previous application folder"
        mv -f "${target_file}" "${target_file}.bkp" 
    fi
fi

if [ -L ${APPLICATION_NAME} ] ; then
        echo "Removing the existing symbolic link"
        rm ${APPLICATION_NAME}
fi
