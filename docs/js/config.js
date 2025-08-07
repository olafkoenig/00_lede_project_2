// Configuration for the scrollytelling map
var config = {
  // Mapbox configuration
  accessToken:
    "pk.eyJ1IjoiZmFsb2dpbmtvIiwiYSI6ImNsN3JvOWM5ZDBoZTAzcnBsNGs3c2czc3YifQ.WOXaAsqGUbIVOguojJAbuA",
  style: "mapbox://styles/faloginko/cmde3vaxu02mf01s44xx048m2",
  showMarkers: false,
  theme: "light",
  use3dTerrain: false,
  auto: false,
  inset: false,

  // City coordinates (from your centroids data)
  cities: {
    stgallen: [9.37698, 47.42511],
    geneva: [6.14, 46.2],
    lausanne: [6.64748, 46.54927],
    switzerland: [8.37352, 46.89788], // Center
  },

  // Responsive zoom levels
  zoomLevels: {
    mobile: {
      cityOverview: 10,
      cityDetail: 11, // ← Actuel
      cityDetailLausanne: 11, // ← Nouveau zoom spécial Lausanne
      cityZoom: 11,
      countryOverview: 7 - 1,
    },
    desktop: {
      cityOverview: 11,
      cityDetail: 12.5, // ← Actuel
      cityDetailLausanne: 12, // ← Nouveau zoom spécial Lausanne
      cityZoom: 12.5,
      countryOverview: 8,
    },
  },

  // Helper function to get responsive location
  getLocation: function (center, zoomKey, pitch = 0, bearing = 0) {
    const isMobile = window.innerWidth <= 750;
    const zoom = isMobile
      ? this.zoomLevels.mobile[zoomKey]
      : this.zoomLevels.desktop[zoomKey];

    return {
      center: center,
      zoom: zoom,
      pitch: pitch,
      bearing: bearing,
    };
  },

  // Helper function to get responsive chart image
  getChartImage: function (baseName) {
    const isMobile = window.innerWidth <= 600;
    const suffix = isMobile ? "-mobile" : "-desktop";
    return `./charts/${baseName}${suffix}.png`;
  },

  // Scrollytelling chapters
  //  ----------------------------------
  // --------------ST. GALLEN --------------
  //  ----------------------------------
  chapters: [
    // ST. GALLEN SEQUENCE
    {
      id: "stgallen-overview",
      alignment: "right",
      hidden: false,
      title: "St. Gallen from above",
      description:
        "St. Gallen, population 76,000. From above, it looks like a quiet town near Lake Constance. But beneath this apparent uniformity lies one of the most striking environmental inequalities among Switzerland's major cities.",
      getLocation: function () {
        return config.getLocation(
          config.cities.stgallen,
          "cityOverview",
          45,
          0
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 1000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
      ],
    },
    {
      id: "stgallen-pollution",
      alignment: "right",
      hidden: false,
      title: "Air pollution revealed",
      description:
        "Here we see nitrogen dioxide - NO₂ - air pollution across the city. The most polluted areas cluster around highways and major roads – cars being the primary source of this pollutant. The World Health Organization guideline is 10 μg/m³, while Swiss law allows 30 μg/m³.",
      legend: {
        image: "./charts/legend-no2.svg",
      },
      getLocation: function () {
        return config.getLocation(config.cities.stgallen, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 1,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0.4,
          duration: 500,
        },
      ],
    },
    {
      id: "stgallen-social-geography",
      alignment: "right",
      hidden: false,
      title: "The social map",
      description:
        'Now let\'s see how the population is distributed across the city by socioeconomic status. The <span style="background: #d73027; color: white; padding: 0 0.3em; border-radius: 0.3em;">poorest&nbsp;households</span> cluster near major roads and the city center, while <span style="background: #4575b4; color: white; padding: 0 0.3em; border-radius: 0.3em;">wealthier&nbsp;residents</span> live further away – enjoying cleaner air.',
      legend: {
        image: "./charts/legend-ses.svg",
      },
      getLocation: function () {
        return config.getLocation(config.cities.stgallen, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.8,
          duration: 2000,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0.4,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.8,
          duration: 500,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0.4,
          duration: 500,
        },
      ],
    },
    {
      id: "stgallen-scatter-analysis",
      alignment: "right",
      hidden: false,
      title: "Environmental inequality exposed",
      description:
        "The chart below shows every household in St. Gallen plotted by socioeconomic status and air pollution exposure. Each dot represents a household. The pattern is clear: wealthier families breathe cleaner air, while the poorest bear the burden of pollution.",
      chart: {
        type: "datawrapper",
        embedUrl: "https://datawrapper.dwcdn.net/rffGE/2/",
        height: 654,
      },
      getLocation: function () {
        return config.getLocation(config.cities.stgallen, "cityDetail", 25, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 1000,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0.4,
          duration: 1000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.4,
          duration: 500,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0.5,
          duration: 500,
        },
      ],
    },
    {
      id: "stgallen-inequality-gap",
      alignment: "right",
      hidden: false,
      title: "Switzerland's biggest gap",
      description:
        'Here we see the stark divide: <span style="background: #313695; color: white; padding: 0 0.3em; border-radius: 0.3em;">orange&nbsp;clusters show wealthy households breathing clean air</span> , while <span style="background: #a50026; color: white; padding: 0 0.3em; border-radius: 0.3em;">red&nbsp;areas reveal poor families trapped in pollution</span>.<br><br>St. Gallen has the largest inequality gap among Swiss cities. <strong>Only 14% of wealthy households face pollution above 15 μg/m³, compared to 63% of the poorest families.</strong>',
      getLocation: function () {
        return config.getLocation(config.cities.stgallen, "cityZoom", 20, 15);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "hotspots-no2-final-972i4m",
          opacity: 0.8,
          duration: 2000,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0.4,
          duration: 1000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 0.4,
          duration: 500,
        },
        {
          layer: "hotspots-no2-final-972i4m",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0,
          duration: 500,
        },
      ],
    },
    //  ----------------------------------
    // --------------GENEVA --------------
    //  ----------------------------------
    // GENEVA SEQUENCE
    {
      id: "geneva-overview",
      alignment: "right",
      hidden: false,
      title: "The dense metropolis",
      description:
        "Welcome to Geneva, population 200,000. A dense, international city on the shores of Lake Geneva. This urban intensity creates a unique environmental story.",
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityOverview", 45, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
      ],
    },
    {
      id: "geneva-pollution",
      alignment: "right",
      hidden: false,
      title: "Dense air, shared burden",
      description:
        "Geneva's exceptional density, compared to other Swiss cities, creates widespread NO₂ air pollution. The urban fabric traps emissions across the entire metropolitan area.",
      legend: {
        image: "./charts/legend-no2.svg",
      },
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0.8,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0.4,
          duration: 500,
        },
      ],
    },
    {
      id: "geneva-equalizing-density",
      alignment: "right",
      hidden: false,
      title: "When density equalizes exposure",
      description:
        "Adding households by socioeconomic class reveals something remarkable: nearly all families, regardless of income, face high pollution levels above 15 μg/m³. Density creates an unexpected equality of exposure.",
      legend: {
        image: "./charts/legend-ses.svg",
      },
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0.4,
          duration: 1000,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.8,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0.4,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.4,
          duration: 500,
        },
      ],
    },
    {
      id: "geneva-equal-pollution",
      alignment: "right",
      hidden: false,
      title: "Pollution without privilege",
      description:
        'The scatter plot reveals Geneva\'s unique pattern: an almost "egalitarian" exposure to pollution where rich and poor households breathe similarly polluted air. Urban density has leveled the playing field – at least for air quality.',
      chart: {
        type: "datawrapper",
        embedUrl: "https://datawrapper.dwcdn.net/8ZPgH/1/",
        height: 654,
      },
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 25, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0.4,
          duration: 1000,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.4,
          duration: 1000,
        },
        {
          layer: "hotspots-no2-final-972i4m",
          opacity: 0,
          duration: 4000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "hotspots-no2-final-972i4m",
          opacity: 0,
          duration: 4000,
        },
      ],
    },
    {
      id: "geneva-concrete-jungle",
      alignment: "right",
      hidden: false,
      title: "Concrete center, green periphery",
      description:
        "Now let's examine vegetation intensity across the city. The hyper-dense city center leaves little room for greenery, while nature flourishes on the outskirts. In Geneva, green space is a geography of distance.",
      legend: {
        image: "./charts/legend-ndvi.svg",
      },
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0.8,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0.4,
          duration: 500,
        },
      ],
    },
    {
      id: "geneva-nature-privilege",
      alignment: "right",
      hidden: false,
      title: "The privilege of green",
      description:
        'This chart reveals spatial segregation in action. While vegetation is scarce citywide, <span style="background: #4575b4; color: white; padding: 0 0.3em; border-radius: 0.3em;">wealthy&nbsp;households</span> consistently access greener environments than their <span style="background: #d73027; color: white; padding: 0 0.3em; border-radius: 0.3em;">less&nbsp;affluent&nbsp;neighbors</span>. Nature becomes a luxury good.',
      chart: {
        type: "datawrapper",
        embedUrl: "https://datawrapper.dwcdn.net/qRJ8l/1/",
        height: 654,
      },
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 25, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.8,
          duration: 1000,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0.4,
          duration: 1000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0.4,
          duration: 500,
        },
      ],
    },
    {
      id: "geneva-paradox",
      alignment: "right",
      hidden: false,
      title: "The Geneva paradox",
      description:
        'The geography tells the story: <span style="background: #313695; color: white; padding: 0 0.3em; border-radius: 0.3em;">wealthy&nbsp;clusters with abundant vegetation access</span> spread across the city\'s periphery, while <span style="background: #a50026; color: white; padding: 0 0.3em; border-radius: 0.3em;">poor&nbsp;clusters with limited green space</span> concentrate in the dense urban center.<br><br>The final picture is striking: <strong>95% of the poorest households have limited access to green environments, compared to 72% of the wealthiest</strong>.<br><br>In Geneva, density equalizes pollution exposure, but creates stark inequality in access to nature.',
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 45, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 1000,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0.4,
          duration: 1000,
        },
        {
          layer: "hotspots-green-final-72df90",
          opacity: 0.8,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 0.4,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "hotspots-green-final-72df90",
          opacity: 0,
          duration: 500,
        },
      ],
    },
    //  ----------------------------------
    // --------------LAUSANNE --------------
    //  ----------------------------------
    //

    {
      id: "lausanne-overview",
      alignment: "right",
      hidden: false,
      title: "Lausanne, final destination",
      description:
        "Lausanne, our final stop. With 140,000 inhabitants, this hillside city also sits on Lake Geneva's shores. Here, we'll discover how geography shapes environmental justice.",
      getLocation: function () {
        return config.getLocation(
          config.cities.lausanne,
          "cityOverview",
          45,
          0
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 1000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 0,
          duration: 500,
        },
      ],
    },
    {
      id: "lausanne-noise",
      alignment: "right",
      hidden: false,
      title: "The sound of traffic",
      description:
        "This layer shows daytime road noise across Lausanne. Like air pollution, this nuisance comes from traffic and peaks along major roadways. The World Health Organization recommends a <strong>daytime limit of 53 dB</strong>.",
      legend: {
        image: "./charts/legend-noise.svg",
      },
      getLocation: function () {
        return config.getLocation(
          config.cities.lausanne,
          "cityDetailLausanne",
          30,
          0
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "noise-5586-lausanne-15xfvd",
          opacity: 1,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "noise-5586-lausanne-15xfvd",
          opacity: 0.8,
          duration: 500,
        },
      ],
    },
    {
      id: "lausanne-noise-inequality",
      alignment: "right",
      hidden: false,
      title: "Unequal exposure to noise",
      description:
        'Like in St. Gallen, <span style="background: #4575b4; color: white; padding: 0 0.3em; border-radius: 0.3em;">privileged&nbsp;households</span> enjoy quieter environments while <span style="background: #d73027; color: white; padding: 0 0.3em; border-radius: 0.3em;">disadvantaged&nbsp;families</span> bear the burden of noise pollution in Lausanne.',
      getLocation: function () {
        return config.getLocation(
          config.cities.lausanne,
          "cityDetailLausanne",
          25,
          0
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 1,
          duration: 1000,
        },
        {
          layer: "noise-5586-lausanne-15xfvd",
          opacity: 0.4,
          duration: 1000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "noise-5586-lausanne-15xfvd",
          opacity: 0.4,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 500,
        },
      ],
    },
    {
      id: "lausanne-noise-hotspots",
      alignment: "right",
      hidden: false,
      title: "Geography of noise inequality",
      chart: {
        type: "datawrapper",
        embedUrl: "https://datawrapper.dwcdn.net/MJu0Z/1/",
        height: 654,
      },
      description:
        'The divide is clear: <span style="background: #313695; color: white; padding: 0 0.3em; border-radius: 0.3em;">wealthy&nbsp;households cluster in the quiet east and north</span>, while <span style="background: #a50026; color: white; padding: 0 0.3em; border-radius: 0.3em;">poor&nbsp;families concentrate in the noisy center and west</span>.<br><br>In Lausanne, <strong>55% of the poorest households face noise above 50 dB, compared to just 28% of the wealthiest.</strong>',
      getLocation: function () {
        return config.getLocation(
          config.cities.lausanne,
          "cityDetailLausanne",
          30,
          15
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "noise-5586-lausanne-15xfvd",
          opacity: 0.2,
          duration: 1000,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.2,
          duration: 1000,
        },
        {
          layer: "hotspots-noise-final-avjjjy",
          opacity: 0.8,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "noise-5586-lausanne-15xfvd",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "hotspots-noise-final-avjjjy",
          opacity: 0,
          duration: 500,
        },
      ],
    },
    {
      id: "lausanne-nature-privilege",
      alignment: "right",
      hidden: false,
      title: "Nature as privilege",
      description:
        "Access to nature isn't equally distributed either. Here we see vegetation intensity – sparse in the center, abundant in the east, and richest in the forested north. Green space follows wealth.",
      legend: {
        image: "./charts/legend-ndvi.svg",
      },
      getLocation: function () {
        return config.getLocation(
          config.cities.lausanne,
          "cityDetailLausanne",
          30,
          0
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0.8,
          duration: 1000,
        },
        {
          layer: "ndvi-5586-lausanne-agregat-288ezd",
          opacity: 0.8,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "ndvi-5586-lausanne-agregat-288ezd",
          opacity: 0.4,
          duration: 500,
        },
      ],
    },
    {
      id: "lausanne-green-concentration",
      alignment: "right",
      hidden: false,
      title: "Concentrated green inequality",
      description:
        'The pattern mirrors the noise distribution: <span style="background: #313695; color: white; padding: 0 0.3em; border-radius: 0.3em;">wealthy&nbsp;green&nbsp;clusters</span> flourish in the leafy periphery of east and north Lausanne, while <span style="background: #a50026; color: white; padding: 0 0.3em; border-radius: 0.3em;">poor&nbsp;concrete&nbsp;clusters</span> are trapped in the dense city center.<br><br>The numbers tell a stark story: <strong>while 72% of wealthy households have limited green space nearby, this rises to 95% for the poorest families. Nature becomes another marker of privilege.</strong>',
      chart: {
        type: "datawrapper",
        embedUrl: "https://datawrapper.dwcdn.net/HfB0J/1/",
        height: 654,
      },
      getLocation: function () {
        return config.getLocation(
          config.cities.lausanne,
          "cityDetailLausanne",
          20,
          15
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "hotspots-green-final-72df90",
          opacity: 0.8,
          duration: 2000,
        },
        {
          layer: "ndvi-5586-lausanne-agregat-288ezd",
          opacity: 0.4,
          duration: 1000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
        {
          layer: "hotspots-green-final-72df90",
          opacity: 0,
          duration: 500,
        },
        {
          layer: "ndvi-5586-lausanne-agregat-288ezd",
          opacity: 0,
          duration: 500,
        },
      ],
    },
    {
      id: "conclusion-overview",
      alignment: "fully",
      hidden: false,
      title: "Three cities, one pattern",
      description:
        "Whether it’s air, noise, or greenery, the same story repeats: in Swiss cities, the environmental quality mirrors social inequality.",
      getLocation: function () {
        return config.getLocation(
          config.cities.switzerland,
          "countryOverview",
          0,
          0
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 500,
        },
      ],
    },
  ],
};
