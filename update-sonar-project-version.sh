#!/usr/bin/env bash

echo "Updating the SonarQube properties..."

# Compute the next version to be released
PACKAGE_VERSION=$(npx semantic-release --dryRun | grep -oP 'Published release \K.*? ')

# Get the project name from package.json
PACKAGE_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')


# Get the Sonar properties file
SONAR_FILE=$(find ./ -iname sonar*.properties -type f)

# Update the version
REPLACE='^sonar.projectVersion=.*$'
WITH="sonar.projectVersion=${PACKAGE_VERSION}"
sed -i.bak "s#${REPLACE}#${WITH}#g" ${SONAR_FILE}
rm ${SONAR_FILE}.bak
rm .releaserc.js

echo "Project ${PACKAGE_NAME} version ${PACKAGE_VERSION} updated in ${SONAR_FILE} "
echo "::set-output name=release_version::$PACKAGE_VERSION"
