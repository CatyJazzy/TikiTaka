#!/bin/bash

# ipconfig 결과를 줄바꿈 정리해서 저장
IPCONFIG_OUTPUT=$(ipconfig.exe | tr -d '\r')

# Wi-Fi 어댑터 섹션만 추출
WIFI_SECTION=$(echo "$IPCONFIG_OUTPUT" | awk '/Wireless LAN adapter Wi-Fi/ {flag=1; next} /^[^ ]/ {flag=0} flag')

# IPv4 주소 추출
IP_ADDRESS=$(echo "$WIFI_SECTION" | grep -i "IPv4" | awk -F: '{gsub(/ /, "", $2); print $2}')

# IP 주소가 비어있는지 확인
if [ -z "$IP_ADDRESS" ]; then
    echo "Wi-Fi IP 주소를 찾을 수 없습니다. 수동으로 입력해주세요."
    read -p "IP 주소를 입력하세요: " IP_ADDRESS
fi

# .env 파일 생성 또는 업데이트
echo "EXPO_PUBLIC_API_URL=http://${IP_ADDRESS}:3000" > .env

echo "IP 주소가 .env 파일에 설정되었습니다: ${IP_ADDRESS}"
