#!/bin/bash
myip=$(ip addr show dev wlp2s0 | awk -F'[ /]*' '/inet /{print $3}')

json-server db.js --host ${myip} --routes routes.json
