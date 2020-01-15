#!/bin/bash
APP_USER=ec2-user

echo "cd to the apps directory"
cd /home/$APP_USER/apps/

if [ -L ${APPLICATION_NAME} ] ; then
    if [ -e ${APPLICATION_NAME} ] ; then
        echo "Reading the target file of the current symbolic link"
        target_file=`readlink -f $APPLICATION_NAME` 
        echo $target_file

        echo "if the applicatio is running"
        echo "Stop the application"
        ./$APPLICATION_NAME/bin/$APPLICATION_NAME status
        ./$APPLICATION_NAME/bin/$APPLICATION_NAME stop
        
        echo "Back up previous application zip file"
        mv "${target_file}.zip" "${target_file}.zip.bkp"

        echo "Back up previous application folder"
        mv "${target_file}" "${target_file}.bkp" 

        echo "Back up previous git.properties"
        mv git.properties git.properties.bkp" 
    fi
fi

if [ -L ${APPLICATION_NAME} ] ; then
        echo "Removing the existing symbolic link"
        rm ${APPLICATION_NAME}
fi
