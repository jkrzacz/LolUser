$(function () {
    var apiKeyParameters = "api_key=024a9118-11db-4339-af39-1b9e1db3420c";
    var region = "";
    var name = "";
    $("#searchButton").click(function () {
        region = $("#region").val();
        name = $("#inputUserName").val();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + name.toLowerCase() + "?" + apiKeyParameters;
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                var userId = result[name.toLowerCase()].id;
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

    
    function getServerStatus(userId) {
        $("#ServerInfo").empty();
        var url = "http://status.leagueoflegends.com/shards/" + region;
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                $("#main-container").css("visibility", "visible");
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
    function getPlayerLeague(userId) {
        $("#PlayerStats").empty();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.5/league/by-summoner/" + userId + "/entry?" + apiKeyParameters;
        $.ajax({
            method: "GET",
            url: url,
            success: function (result) {
                var x = result[userId][0];
                $("#PlayerStats").append("<h1>" + name + "</h1><h3>" + x.queue + "</h3>" + "<div>" + x.tier + " " + x.entries[0].division + " - " + x.entries[0].leaguePoints + "</div><div>" + x.name + "</div><div>Wins:" + x.entries[0].wins + "  Losses:" + x.entries[0].losses + "</div>");

            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    function getstatss2016(userId) {
        $("#SeasonStats2016").empty();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON2016&" + apiKeyParameters;
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
        $("#SeasonStats2015").empty();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON2015&" + apiKeyParameters;
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
        $("#SeasonStats2014").empty();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON2014&" + apiKeyParameters;
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
        $("#SeasonStats2013").empty();
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + userId + "/summary?season=SEASON3&" + apiKeyParameters;
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
    function getChampImage(champName, width, height) {
        var url = "http://ddragon.leagueoflegends.com/cdn/6.13.1/img/champion/" + champName + ".png";
        var myImage = new Image(width, height);
        myImage.src = url;
        
        return myImage;

    }
    function getItemImage(itemId, width, height) {
        var url = "http://ddragon.leagueoflegends.com/cdn/6.13.1/img/item/" + itemId + ".png";
        var myImage = new Image(width, height);
        myImage.src = url;

        return myImage;

    }
    function getSpellImage(SpellId, width, height) {
        var url = "";
        var myImage = new Image(width, height);
        switch (SpellId) {
            case 1:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/9/95/Cleanse.png/revision/latest?cb=20140115125907";
                break;
            case 12:
                url = "http://vignette3.wikia.nocookie.net/leagueoflegends/images/e/e8/Teleport.png/revision/latest?cb=20140115125728";
                break;
            case 30:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/9/9d/To_the_King%21.png/revision/latest?cb=20141125095423";
                break;
            case 14:
                url = "http://vignette3.wikia.nocookie.net/leagueoflegends/images/f/f4/Ignite.png/revision/latest?cb=20131212215221";
                break;
            case 6:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/a/ab/Ghost.png/revision/latest?cb=20140115125935";
                break;
            case 32:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/4/4d/Mark.png/revision/latest?cb=20150410192947";
                break;
            case 7:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/6/6e/Heal.png/revision/latest?cb=20111115121115";
                break;
            case 11:
                url = "http://vignette3.wikia.nocookie.net/leagueoflegends/images/0/05/Smite.png/revision/latest?cb=20140115125806";
                break;
            case 31:
                url = "http://vignette1.wikia.nocookie.net/leagueoflegends/images/8/83/Poro_Toss.png/revision/latest/scale-to-width-down/36?cb=20141125095041";
                break;
            case 3:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/4/4a/Exhaust.png/revision/latest?cb=20111115121116";
                break;
            case 13:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/d/d7/Clarity.png/revision/latest?cb=20131212215533";
                break;
            case 2:
                url = "http://vignette4.wikia.nocookie.net/leagueoflegends/images/2/21/Clairvoyance.png/revision/latest?cb=20140115125838";
                break;
            case 21:
                url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/c/cc/Barrier.png/revision/latest?cb=20140115125640";
                break;
            case 4:
                url = "http://vignette1.wikia.nocookie.net/leagueoflegends/images/7/74/Flash.png/revision/latest?cb=20140115125446";
                break;
        }
        myImage.src = url;

        return myImage;

    }
    function championStats(userId) {
        var url = "https://global.api.pvp.net/api/lol/static-data/" + region + "/v1.2/champion?champData=all&" + apiKeyParameters;
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
        var url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.3/game/by-summoner/" + userId + "/recent?" + apiKeyParameters;
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
        for (var i = 0; i < 10; i++) {
            var a = "#Game" + i;
            $(a + " #Image").empty();
            $(a + " #Image").html(getChampImage(champId[RGames[i].championId], 100, 100)).append("<div>" + champId[RGames[i].championId] + "</div>");

            if (RGames[i].stats.win) {
                $(a + " #Status").html("<td style=\"font-size: 18px; font-weight: bold; color: #99FF44;\">Win</td>")
                $(a).css("background", "linear-gradient(rgba(75, 255, 55, 0.5), rgba(75, 255, 55, 0.3))");
            } else {
                $(a + " #Status").html("<td style=\"font-size: 18px; font-weight: bold; color: #FF99AA;\">Loss</td>");
                $(a).css("background", "linear-gradient(rgba(255, 55, 75, 0.5), rgba(255, 55, 75, 0.3))");
            }
            $(a + " #Name").html("<td>" + RGames[i].subType + "</td>");
            $(a + " #Stats").html("<td>" + RGames[i].stats.championsKilled + "/" + RGames[i].stats.assists + "/" + RGames[i].stats.numDeaths + "</td>");
            var KDA = (RGames[i].stats.championsKilled + RGames[i].stats.assists) / RGames[i].stats.numDeaths;
            $(a + " #KDA").html("<td>" + KDA.toFixed(2) + " KDA</td>");
            $(a + " #Gold").html("<td>" + RGames[i].stats.goldEarned + " Gold</td>");
            $(a + " #Creeps").html("<td>" + RGames[i].stats.minionsKilled + " Creeps</td>");
            $(a + " #Spell1").empty();
            $(a + " #Spell2").empty();
            $(a + " #Spell1").append("<td>").append(getSpellImage(RGames[i].spell1, 50, 50)).append("</td>");
            $(a + " #Spell2").append("<td>").append(getSpellImage(RGames[i].spell2, 50, 50)).append("</td>");
            $(a + " #ItemText").empty();
            $(a + " #Items").empty();
            $(a + " #ItemText").html("<strong>Items</strong>");
            $(a + " #Items").append("<div>");
            if (RGames[i].stats.item0) { $(a + " #Items").append(getItemImage(RGames[i].stats.item0, 40, 40)); }
            else { $(a + " #Items").append(getItemImage(3637, 40, 40)); }
            if (RGames[i].stats.item1) { $(a + " #Items").append(getItemImage(RGames[i].stats.item1, 40, 40)); }
            else { $(a + " #Items").append(getItemImage(3637, 40, 40)); }
            if (RGames[i].stats.item2) { $(a + " #Items").append(getItemImage(RGames[i].stats.item2, 40, 40)); }
            else { $(a + " #Items").append(getItemImage(3637, 40, 40)); }
            if (RGames[i].stats.item6) { $(a + " #Items").append(getItemImage(RGames[i].stats.item6, 40, 40)); }
            else { $(a + " #Items").append(getItemImage(3637, 40, 40)); }
            $(a + " #Items").append("</div><div>");
            if (RGames[i].stats.item3) { $(a + " #Items").append(getItemImage(RGames[i].stats.item3, 40, 40)); }
            else { $(a + " #Items").append(getItemImage(3637, 40, 40)); }
            if (RGames[i].stats.item4) { $(a + " #Items").append(getItemImage(RGames[i].stats.item4, 40, 40)); }
            else { $(a + " #Items").append(getItemImage(3637, 40, 40)); }
            if (RGames[i].stats.item5) { $(a + " #Items").append(getItemImage(RGames[i].stats.item5, 40, 40)); }
            else { $(a + " #Items").append(getItemImage(3637, 40, 40)); }
            $(a + " #Items").append("</div>");
        }
        
        

    }
    



});