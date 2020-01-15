#!/bin/bash
APP_USER=ec2-user
APP_NAME=immport-portal
printenv
echo "cd to the apps directory"
cd /home/$APP_USER/apps/

if [ -L ${APP_NAME} ] ; then
    if [ -e ${APP_NAME} ] ; then
        echo "Reading the target file of the existing symbolic link"
        target_file=`readlink -f $APP_NAME` 
        echo $target_file


        echo "if the applicatio is running"
        echo "Stop the application"
        ./$APP_NAME/bin/$APP_NAME status
        ./$APP_NAME/bin/$APP_NAME stop
        
        echo "Back up previous application zip file"
        mv "${target_file}.zip" "${target_file}.zip.bkp"

        echo "Back up previous application folder"
        mv "${target_file}" "${target_file}.bkp" 
    fi
fi


if [ -L ${APP_NAME} ] ; then
        echo "Removing the existing symbolic link"
        rm ${APP_NAME}
fi
