#!/bin/bash
runtimes=("node" "bun" "deno");
render_types=("fizz" "flight" "ssr" "use-client");

for ((i = 0; i < ${#runtimes[@]}; ++i)); do
    target="http://localhost:300${i}";

    for render_type in "${render_types[@]}"; do

        for ((j = 2; j <= 6; ++j)); do
            count=$((10 ** j));
            filename="${runtimes[i]}_${render_type}_${count}";
            url="/${render_type}?count=${count}";
            duration="10s"
            
            if [ $j -gt 5 ];  
            then  
                duration="20s"
            fi 
            
            echo "${target}";
            mkdir -p ./reports/timings;
            artillery run -o "./reports/timings/${filename}.json" -t "${target}" -v '{ "url": "'${url}'", "duration": "'${duration}'" }' "./artillery/timings.yaml";
            # artillery report -o "./reports/timings/${filename}.html" "./reports/timings/${filename}.json";

        done;

        filename="${runtimes[i]}_${render_type}_10000";
        url="/${render_type}?count=10000";
        rps_test_duration="100s";
        rps_test_max_rps=400;

        if [ "${render_type}" == "ssr" ];
        then
            rps_test_duration="70s";
            rps_test_max_rps=70;
        fi
    

        if [ "${render_type}" == "flight" ];
        then
            rps_test_duration="150s";
            rps_test_max_rps="300";
        fi

        if [ "${render_type}" == "use-client" ];
        then
            rps_test_duration="100s";
            rps_test_max_rps="500";
        fi

        echo "render ${render_type}";
        echo "duration ${rps_test_duration}";
        echo "max rps ${rps_test_max_rps}";

        mkdir -p ./reports/rps;
        artillery run -o "./reports/rps/${filename}.json" -t "${target}" -v '{ "url": "'${url}'", "duration": "'${rps_test_duration}'", "rampTo": "'${rps_test_max_rps}'" }' "./artillery/rps.yaml";
        # artillery report -o "./reports/rps/${filename}.html" "./reports/rps/${filename}.json";

    done;

done;

node ./scripts/prepare.js
