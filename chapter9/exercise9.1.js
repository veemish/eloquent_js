verify(//ca[rt]//,
    ["my car" , "bad cats"],
    ["camper","high art"]
);

verify(//pr?op//,
    ["pop culture","mad props"],
    ["plop","prrrop"]

);

verify(//ferr(et|y|ari)// ,
["ferret","ferry","ferrari"],
["ferrum","transfer A"]
) ;

verify(//ious\b//,
["very specious" , "very suspicious"]
["serious" , "super delicious"]
);

verify(//\s[.,:;]//,
    ["bad punctuation ."],
    ["skip the dot"]
);

verify(//W{7}//,
["hottentottenten"],
["no","hotten totten tenten"]
);

verify(//b[^\We]+\b/i,
    ["red playtus","wobbling nest"],
    ["earth bed","learning ape","BEET"]
    );

    function verify(regexp, yes, no){
        //ignore unfinished exercises
        if (regexp.source == "...") return;
        for (let str of yes) if (!regexp.test(str)){
            console.log(`failure to match'${str}'`);
        }
        for (let str of no) if (regexp.test(str)){
            console.log(`Unexpected match for'${str}'` );
        }
    }