$(function () {
    $("#searchButton").click(function () {
        var apiKeyParameters = "?api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        var region = $("#region").val();
        var name = $("#inputUserName").val().toLowerCase();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + name + apiKeyParameters;
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                var userId = result[name].id;
                console.log(userId);
                getstatss2016(userId);
                getstatss2015(userId);
                getPlayerLeague(userId);
                championStats(userId);

            },
            error: function (error) {
                console.log(error);
            }
        })
    });


    function getPlayerLeague(userId) {
        var region = $("#region").val();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.5/league/by-summoner/" + userId + "/entry?api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        console.log(url);
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                var x = result[userId][0];
                $("#PlayerStats").append("<h3>" + x.queue + "</h3>" + "<div>" + x.tier + " " + x.entries[0].division + " - " + x.entries[0].leaguePoints + "</div><div>" + x.name + "</div><div>Wins:" + x.entries[0].wins + "  Losses:" + x.entries[0].losses + "</div>");
                debugger;

            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    function getstatss2016(userId) {
        var region = $("#region").val();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON2016&api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                for (var i = 0; i < result.playerStatSummaries.length; i++) {
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedSolo5x5") {
                        var rs = i;

                    }
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedTeam5x5") {
                        var rt = i;
                    }

                }
                $("#SeasonStats").append("<h2>Season 2016</h2>" + "<div><strong>RankedSolo5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rs].wins + "</div><div>Loses:" + result.playerStatSummaries[rs].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rs].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled + "</div>")
                           .append("<div><strong>RankedTeam5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rt].wins + "</div><div>Loses:" + result.playerStatSummaries[rt].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rt].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled + "</div>");
                getstatss2014(userId);
            },
            error: function (error) {
                console.log(error);
            }
        })

    }
    function getstatss2015(userId) {
        var region = $("#region").val();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON2015&api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                for (var i = 0; i < result.playerStatSummaries.length; i++) {
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedSolo5x5") {
                        var rs = i;

                    }
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedTeam5x5") {
                        var rt = i;
                    }

                }
                $("#SeasonStats").append("<h2>Season 2015</h2>" + "<div><strong>RankedSolo5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rs].wins + "</div><div>Loses:" + result.playerStatSummaries[rs].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rs].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled + "</div>")
                           .append("<div><strong>RankedTeam5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rt].wins + "</div><div>Loses:" + result.playerStatSummaries[rt].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rt].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled + "</div>");
                getstatss2013(userId);
            },
            error: function (error) {
                console.log(error);
            }
        })

    }
    function getstatss2014(userId) {
        var region = $("#region").val();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON2014&api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                for (var i = 0; i < result.playerStatSummaries.length; i++) {
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedSolo5x5") {
                        var rs = i;

                    }
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedTeam5x5") {
                        var rt = i;
                    }

                }
                $("#SeasonStats").append("<h2>Season 2014</h2>" + "<div><strong>RankedSolo5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rs].wins + "</div><div>Loses:" + result.playerStatSummaries[rs].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rs].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled + "</div>")
                           .append("<div><strong>RankedTeam5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rt].wins + "</div><div>Loses:" + result.playerStatSummaries[rt].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rt].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled + "</div>");
            },
            error: function (error) {
                console.log(error);
            }
        })

    }
    function getstatss2013(userId) {
        var region = $("#region").val();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON3&api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                for (var i = 0; i < result.playerStatSummaries.length; i++) {
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedSolo5x5") {
                        var rs = i;
                    }
                    if (result.playerStatSummaries[i].playerStatSummaryType === "RankedTeam5x5") {
                        var rt = i;
                    }

                }
                $("#SeasonStats").append("<h2>Season 2013</h2>" + "<div><strong>RankedSolo5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rs].wins + "</div><div>Loses:" + result.playerStatSummaries[rs].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rs].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rs].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled + "</div>")
                           .append("<div><strong>RankedTeam5vs5</strong></div>" + "<div>Wins:" + result.playerStatSummaries[rt].wins + "</div><div>Loses:" + result.playerStatSummaries[rt].losses + "</div><div>TotalChampionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalChampionKills + "</div><div>TotalAssists:" + result.playerStatSummaries[rt].aggregatedStats.totalAssists + "</div><div>TotalMinionKills:" + result.playerStatSummaries[rt].aggregatedStats.totalMinionKills + "</div><div>TotalTurretsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled + "</div><div>TotalNeutralMinionsKilled:" + result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled + "</div>");
            },
            error: function (error) {
                console.log(error);
            }
        })

    }
    function championStats(userId) {
        var region = $("#region").val();
        var url = "https://eune.api.pvp.net/championmastery/location/EUN1/player/24491185/champions?api_key=024a9118-11db-4339-af39-1b9e1db3420c&jsoncallback=?";
        $.getJSON(url, function (json) {
            debugger;
        });
    }



});