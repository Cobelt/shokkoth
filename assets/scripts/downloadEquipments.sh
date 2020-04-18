#!/bin/bash

read -p "Use graphql on localhost ? [y]/n" isLocalhost
isLocalhost=${isLocalhost:-y}

read -p "Download only missing files ? [y]/n" missingOnly
missingOnly=${missingOnly:-y}

read -p "Which page ? [1] " page
page=${page:-1}

read -p "How much by page ? [200] " perPage
perPage=${perPage:-200}

skip=$(( ($page-1) * $perPage ))

[[ "$isLocalhost" = "y" ]] && uri="localhost:4001" || uri="graphql.dev.shokkoth.fr"

curl "http://$uri/?query=query%20tota(%24skip%3A%20Int%2C%20%24limit%3A%20Int)%20%7B%0A%20%20equipmentMany(skip%3A%20%24skip%2C%20limit%3A%20%24limit)%20%7B%0A%20%20%20%20ankamaId%0A%20%20%20%20imgUrl%0A%20%20%7D%0A%7D&variables=%7B%0A%20%20%22skip%22%3A%20$skip%2C%0A%20%20%22limit%22%3A%20$perPage%0A%7D" | jq -r -c '.data.equipmentMany[]' | while read item ; do
	id=$(echo -e "${item}" | jq '.ankamaId' | sed -e s/\"//g)
	url=$(echo -e "${item}" | jq '.imgUrl' | sed -e s/\"//g)
	id=${id%\"}
	id=${id#\"}

	url=${url%\"}
	url=${url#\"}

	if [[ ! -f "/data/github/shokkoth/assets/equipments/$id.png" || ! "$missingOnly" = "y" ]]; then
		echo -e "ID: $id"
		echo -e "URL: $url"
		wget -O /data/github/shokkoth/assets/equipments/$id.png $url -t 3
		read -p "Continuing in 0.5 Seconds...." -t 0.5
	fi
done
