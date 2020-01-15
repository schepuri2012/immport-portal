#!/bin/bash
echo "AWS CodeDeploy ${LIFECYCLE_EVENT} script running as user ${USER}"

APP_USER=ec2-user
CODEDEPLOY_DIR=/home/$APP_USER/codedeploy_work_dir 

if [ -d ${CODEDEPLOY_DIR} ]
then
    echo "Clearing/Deleting AWS CodeDeploy work directory"    
    rm -rf ${CODEDEPLOY_DIR}
    echo "Creating AWS CodeDeploy work directory"    
    mkdir ${CODEDEPLOY_DIR}
else
    mkdir ${CODEDEPLOY_DIR}
fi 

echo "cd to the apps directory"
if cd /home/$APP_USER/apps/; then
    if [ -L ${APPLICATION_NAME} ] ; then
        if [ -e ${APPLICATION_NAME} ] ; then
            {
                set -e
                echo "Reading the target file of the current symbolic link"
                target_file=`readlink -f $APPLICATION_NAME` 
                echo "Current symbolic link is pointing to $target_file"

                echo "Stop the application, if the application is running"
                /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME stop
                
                if [ -f "${target_file}.zip.bkp" ]; then
                    echo "Remove previous backup application zip file: ${target_file}.zip.bkp"
                    rm -f "${target_file}.zip.bkp"
                fi

                if [ -d "${target_file}.bkp" ]; then
                    echo "Remove previous backup application folder: ${target_file}.bkp"
                    rm -rf "${target_file}.bkp"
                fi

                if [ -f "${target_file}.zip" ]; then
                    echo "Back up current application zip file: ${target_file}.zip"
                    mv "${target_file}.zip" "${target_file}.zip.bkp"
                fi

                if [ -d "${target_file}" ]; then
                    echo "Back up current application folder: ${target_file}"
                    mv "${target_file}" "${target_file}.bkp" 
                fi
            }
        fi
    fi
else 
    error_exit "Cannot change directory!  Aborting."
fi

if [ -L ${APPLICATION_NAME} ] ; then
    {
        set -e
        echo "Removing the existing symbolic link"
        rm ${APPLICATION_NAME}
    }
fi

error_exit()
{
	echo "$1" 1>&2
	exit 1
}

exit 0