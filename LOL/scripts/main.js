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
                getServerStatus(userId);
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
        var url = "http://status.leagueoflegends.com/shards/" + region;
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                $("#ServerInfo").append("<h3>Servers Status</h3><div><strong>" + result.name + "</strong></div><div>" + result.services[0].name + " : <span id=\"statusGameColor\">" + result.services[0].status + "</span></div>")
                .append("<div>" + result.services[1].name + " : <span id=\"statusStoreColor\">" + result.services[1].status + "</span></div>")
                .append("<div>" + result.services[2].name + " : <span id=\"statusWebsiteColor\">" + result.services[2].status + "</span></div>")
                .append("<div>" + result.services[3].name + " : <span id=\"statusClientColor\">" + result.services[3].status + "</span></div>");
                if (result.services[0].status === "online") { $("#statusGameColor").css("color", "green"); } else { $("#statusGameColor").css("color", "red") }
                if (result.services[1].status === "online") { $("#statusStoreColor").css("color", "green"); } else { $("#statusStoreColor").css("color", "red") }
                if (result.services[2].status === "online") { $("#statusWebsiteColor").css("color", "green"); } else { $("#statusWebsiteColor").css("color", "red") }
                if (result.services[3].status === "online") { $("#statusClientColor").css("color", "green"); } else { $("#statusClientColor").css("color", "red") }
                

            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    function getServerStatus(userId) {
        var region = $("#region").val();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.5/league/by-summoner/" + userId + "/entry?api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                var x = result[userId][0];
                $("#PlayerStats").append("<h3>" + x.queue + "</h3>" + "<div>" + x.tier + " " + x.entries[0].division + " - " + x.entries[0].leaguePoints + "</div><div>" + x.name + "</div><div>Wins:" + x.entries[0].wins + "  Losses:" + x.entries[0].losses + "</div>");

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
                $("#SeasonStats2016").append("<h2>Season 2016</h2>" + "<div><strong>RankedSolo5vs5</strong></div>" + "<div>Wins:");
                if (!result.playerStatSummaries[rs].wins) { $("#SeasonStats2016").append("0"); }
                else { $("#SeasonStats2016").append(result.playerStatSummaries[rs].wins); }
                $("#SeasonStats2016").append("</div><div>Loses:");
                if (!result.playerStatSummaries[rs].losses) { $("#SeasonStats2016").append("0"); }
                else { $("#SeasonStats2016").append(result.playerStatSummaries[rs].losses); }
                $("#SeasonStats2016").append("</div><div>TotalChampionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalChampionKills) { $("#SeasonStats2016").append("0"); }
                else { $("#SeasonStats2016").append(result.playerStatSummaries[rs].aggregatedStats.totalChampionKills); }
                $("#SeasonStats2016").append("</div><div>TotalAssists:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalAssists) { $("#SeasonStats2016").append("0"); }
                else { $("#SeasonStats2016").append(result.playerStatSummaries[rs].aggregatedStats.totalAssists); }
                $("#SeasonStats2016").append("</div><div>TotalMinionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalMinionKills) { $("#SeasonStats2016").append("0"); }
                else { $("#SeasonStats2016").append(result.playerStatSummaries[rs].aggregatedStats.totalMinionKills); }
                $("#SeasonStats2016").append("</div><div>TotalTurretsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2016").append("0"); }
                else { $("#SeasonStats2016").append(result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled); }
                $("#SeasonStats2016").append("</div><div>TotalNeutralMinionsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2016").append("0"); }
                else { $("#SeasonStats2016").append(result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2016").append("</div><div><strong>RankedTeam5vs5</strong></div><div>Wins:");
                    if (!result.playerStatSummaries[rt].wins) { $("#SeasonStats2016").append("0"); }
                    else { $("#SeasonStats2016").append(result.playerStatSummaries[rt].wins); }
                    $("#SeasonStats2016").append("</div><div>Loses:");
                    if (!result.playerStatSummaries[rt].losses) { $("#SeasonStats2016").append("0"); }
                    else { $("#SeasonStats2016").append(result.playerStatSummaries[rt].losses); }
                    $("#SeasonStats2016").append("</div><div>TotalChampionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalChampionKills) { $("#SeasonStats2016").append("0"); }
                    else { $("#SeasonStats2016").append(result.playerStatSummaries[rt].aggregatedStats.totalChampionKills); }
                    $("#SeasonStats2016").append("</div><div>TotalAssists:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalAssists) { $("#SeasonStats2016").append("0"); }
                    else { $("#SeasonStats2016").append(result.playerStatSummaries[rt].aggregatedStats.totalAssists); }
                    $("#SeasonStats2016").append("</div><div>TotalMinionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalMinionKills) { $("#SeasonStats2016").append("0"); }
                    else { $("#SeasonStats2016").append(result.playerStatSummaries[rt].aggregatedStats.totalMinionKills); }
                    $("#SeasonStats2016").append("</div><div>TotalTurretsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2016").append("0"); }
                    else { $("#SeasonStats2016").append(result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled); }
                    $("#SeasonStats2016").append("</div><div>TotalNeutralMinionsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2016").append("0"); }
                    else { $("#SeasonStats2016").append(result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2016").append("</div>");
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
                $("#SeasonStats2015").append("<h2>Season 2015</h2>" + "<div><strong>RankedSolo5vs5</strong></div><div>Wins:");
                if (!result.playerStatSummaries[rs].wins) { $("#SeasonStats2015").append("0"); }
                else { $("#SeasonStats2015").append(result.playerStatSummaries[rs].wins); }
                $("#SeasonStats2015").append("</div><div>Loses:");
                if (!result.playerStatSummaries[rs].losses) { $("#SeasonStats2015").append("0"); }
                else { $("#SeasonStats2015").append(result.playerStatSummaries[rs].losses); }
                $("#SeasonStats2015").append("</div><div>TotalChampionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalChampionKills) { $("#SeasonStats2015").append("0"); }
                else { $("#SeasonStats2015").append(result.playerStatSummaries[rs].aggregatedStats.totalChampionKills); }
                $("#SeasonStats2015").append("</div><div>TotalAssists:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalAssists) { $("#SeasonStats2015").append("0"); }
                else { $("#SeasonStats2015").append(result.playerStatSummaries[rs].aggregatedStats.totalAssists); }
                $("#SeasonStats2015").append("</div><div>TotalMinionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalMinionKills) { $("#SeasonStats2015").append("0"); }
                else { $("#SeasonStats2015").append(result.playerStatSummaries[rs].aggregatedStats.totalMinionKills); }
                $("#SeasonStats2015").append("</div><div>TotalTurretsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2015").append("0"); }
                else { $("#SeasonStats2015").append(result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled); }
                $("#SeasonStats2015").append("</div><div>TotalNeutralMinionsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2015").append("0"); }
                else { $("#SeasonStats2015").append(result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2015").append("</div><div><strong>RankedTeam5vs5</strong></div><div>Wins:");
                    if (!result.playerStatSummaries[rt].wins) { $("#SeasonStats2015").append("0"); }
                    else { $("#SeasonStats2015").append(result.playerStatSummaries[rt].wins); }
                    $("#SeasonStats2015").append("</div><div>Loses:");
                    if (!result.playerStatSummaries[rt].losses) { $("#SeasonStats2015").append("0"); }
                    else { $("#SeasonStats2015").append(result.playerStatSummaries[rt].losses); }
                    $("#SeasonStats2015").append("</div><div>TotalChampionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalChampionKills) { $("#SeasonStats2015").append("0"); }
                    else { $("#SeasonStats2015").append(result.playerStatSummaries[rt].aggregatedStats.totalChampionKills); }
                    $("#SeasonStats2015").append("</div><div>TotalAssists:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalAssists) { $("#SeasonStats2015").append("0"); }
                    else { $("#SeasonStats2015").append(result.playerStatSummaries[rt].aggregatedStats.totalAssists); }
                    $("#SeasonStats2015").append("</div><div>TotalMinionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalMinionKills) { $("#SeasonStats2015").append("0"); }
                    else { $("#SeasonStats2015").append(result.playerStatSummaries[rt].aggregatedStats.totalMinionKills); }
                    $("#SeasonStats2015").append("</div><div>TotalTurretsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2015").append("0"); }
                    else { $("#SeasonStats2015").append(result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled); }
                    $("#SeasonStats2015").append("</div><div>TotalNeutralMinionsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2015").append("0"); }
                    else { $("#SeasonStats2015").append(result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2015").append("</div>");
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
                $("#SeasonStats2014").append("<h2>Season 2014</h2>" + "</div><div><strong>RankedTeam5vs5</strong></div><div>Wins:");
                if (!result.playerStatSummaries[rs].wins) { $("#SeasonStats2014").append("0"); }
                else { $("#SeasonStats2014").append(result.playerStatSummaries[rs].wins); }
                $("#SeasonStats2014").append("</div><div>Loses:");
                if (!result.playerStatSummaries[rs].losses) { $("#SeasonStats2014").append("0"); }
                else { $("#SeasonStats2014").append(result.playerStatSummaries[rs].losses); }
                $("#SeasonStats2014").append("</div><div>TotalChampionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalChampionKills) { $("#SeasonStats2014").append("0"); }
                else { $("#SeasonStats2014").append(result.playerStatSummaries[rs].aggregatedStats.totalChampionKills); }
                $("#SeasonStats2014").append("</div><div>TotalAssists:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalAssists) { $("#SeasonStats2014").append("0"); }
                else { $("#SeasonStats2014").append(result.playerStatSummaries[rs].aggregatedStats.totalAssists); }
                $("#SeasonStats2014").append("</div><div>TotalMinionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalMinionKills) { $("#SeasonStats2014").append("0"); }
                else { $("#SeasonStats2014").append(result.playerStatSummaries[rs].aggregatedStats.totalMinionKills); }
                $("#SeasonStats2014").append("</div><div>TotalTurretsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2014").append("0"); }
                else { $("#SeasonStats2014").append(result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled); }
                $("#SeasonStats2014").append("</div><div>TotalNeutralMinionsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2014").append("0"); }
                else { $("#SeasonStats2014").append(result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2014").append("</div><div><strong>RankedTeam5vs5</strong></div><div>Wins:");
                    if (!result.playerStatSummaries[rt].wins) { $("#SeasonStats2014").append("0"); }
                    else { $("#SeasonStats2014").append(result.playerStatSummaries[rt].wins); }
                    $("#SeasonStats2014").append("</div><div>Loses:");
                    if (!result.playerStatSummaries[rt].losses) { $("#SeasonStats2014").append("0"); }
                    else { $("#SeasonStats2014").append(result.playerStatSummaries[rt].losses); }
                    $("#SeasonStats2014").append("</div><div>TotalChampionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalChampionKills) { $("#SeasonStats2014").append("0"); }
                    else { $("#SeasonStats2014").append(result.playerStatSummaries[rt].aggregatedStats.totalChampionKills); }
                    $("#SeasonStats2014").append("</div><div>TotalAssists:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalAssists) { $("#SeasonStats2014").append("0"); }
                    else { $("#SeasonStats2014").append(result.playerStatSummaries[rt].aggregatedStats.totalAssists); }
                    $("#SeasonStats2014").append("</div><div>TotalMinionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalMinionKills) { $("#SeasonStats2014").append("0"); }
                    else { $("#SeasonStats2014").append(result.playerStatSummaries[rt].aggregatedStats.totalMinionKills); }
                    $("#SeasonStats2014").append("</div><div>TotalTurretsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2014").append("0"); }
                    else { $("#SeasonStats2014").append(result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled); }
                    $("#SeasonStats2014").append("</div><div>TotalNeutralMinionsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2014").append("0"); }
                    else { $("#SeasonStats2014").append(result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2014").append("</div>");
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
                $("#SeasonStats2013").append("<h2>Season 2013</h2>" + "</div><div><strong>RankedTeam5vs5</strong></div><div>Wins:");
                if (!result.playerStatSummaries[rs].wins) { $("#SeasonStats2013").append("0"); }
                else { $("#SeasonStats2013").append(result.playerStatSummaries[rs].wins); }
                $("#SeasonStats2013").append("</div><div>Loses:");
                if (!result.playerStatSummaries[rs].losses) { $("#SeasonStats2013").append("0"); }
                else { $("#SeasonStats2013").append(result.playerStatSummaries[rs].losses); }
                $("#SeasonStats2013").append("</div><div>TotalChampionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalChampionKills) { $("#SeasonStats2013").append("0"); }
                else { $("#SeasonStats2013").append(result.playerStatSummaries[rs].aggregatedStats.totalChampionKills); }
                $("#SeasonStats2013").append("</div><div>TotalAssists:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalAssists) { $("#SeasonStats2013").append("0"); }
                else { $("#SeasonStats2013").append(result.playerStatSummaries[rs].aggregatedStats.totalAssists); }
                $("#SeasonStats2013").append("</div><div>TotalMinionKills:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalMinionKills) { $("#SeasonStats2013").append("0"); }
                else { $("#SeasonStats2013").append(result.playerStatSummaries[rs].aggregatedStats.totalMinionKills); }
                $("#SeasonStats2013").append("</div><div>TotalTurretsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2013").append("0"); }
                else { $("#SeasonStats2013").append(result.playerStatSummaries[rs].aggregatedStats.totalTurretsKilled); }
                $("#SeasonStats2013").append("</div><div>TotalNeutralMinionsKilled:");
                if (!result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2013").append("0"); }
                else { $("#SeasonStats2013").append(result.playerStatSummaries[rs].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2013").append("</div><div><strong>RankedTeam5vs5</strong></div><div>Wins:");
                    if (!result.playerStatSummaries[rt].wins) { $("#SeasonStats2013").append("0"); }
                    else { $("#SeasonStats2013").append(result.playerStatSummaries[rt].wins); }
                    $("#SeasonStats2013").append("</div><div>Loses:");
                    if (!result.playerStatSummaries[rt].losses) { $("#SeasonStats2013").append("0"); }
                    else { $("#SeasonStats2013").append(result.playerStatSummaries[rt].losses); }
                    $("#SeasonStats2013").append("</div><div>TotalChampionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalChampionKills) { $("#SeasonStats2013").append("0"); }
                    else { $("#SeasonStats2013").append(result.playerStatSummaries[rt].aggregatedStats.totalChampionKills); }
                    $("#SeasonStats2013").append("</div><div>TotalAssists:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalAssists) { $("#SeasonStats2013").append("0"); }
                    else { $("#SeasonStats2013").append(result.playerStatSummaries[rt].aggregatedStats.totalAssists); }
                    $("#SeasonStats2013").append("</div><div>TotalMinionKills:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalMinionKills) { $("#SeasonStats2013").append("0"); }
                    else { $("#SeasonStats2013").append(result.playerStatSummaries[rt].aggregatedStats.totalMinionKills); }
                    $("#SeasonStats2013").append("</div><div>TotalTurretsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled) { $("#SeasonStats2013").append("0"); }
                    else { $("#SeasonStats2013").append(result.playerStatSummaries[rt].aggregatedStats.totalTurretsKilled); }
                    $("#SeasonStats2013").append("</div><div>TotalNeutralMinionsKilled:");
                    if (!result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled) { $("#SeasonStats2013").append("0"); }
                    else { $("#SeasonStats2013").append(result.playerStatSummaries[rt].aggregatedStats.totalNeutralMinionsKilled); }
                    $("#SeasonStats2013").append("</div>");
            },
            error: function (error) {
                console.log(error);
            }
        })

    }
    function championStats(userId) {
        var region = $("#region").val();
        var url = "https://global.api.pvp.net/api/lol/static-data/" + region + "/v1.2/champion?champData=all&api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                var champId = result.keys;
                getRecentGames(userId, champId);

            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    function getRecentGames(userId,champId) {
        var region = $("#region").val();
            var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/game/by-summoner/" + userId + "/recent?api_key=024a9118-11db-4339-af39-1b9e1db3420c";
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                var RGames = result.games;
                showRecentGames(userId, champId, RGames);
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    function showRecentGames(userId, champId, RGames) {

        debugger;
    }




});