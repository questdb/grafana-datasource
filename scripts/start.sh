#!/bin/sh

systemctl stop grafana --user
sleep 0.5
systemctl start grafana --user
