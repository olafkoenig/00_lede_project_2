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
    lausanne: [6.65, 46.6],
    switzerland: [7.4474, 46.948], // Center between cities
  },

  // Responsive zoom levels
  zoomLevels: {
    mobile: {
      cityOverview: 10,
      cityDetail: 11,
      cityZoom: 11,
      countryOverview: 7,
    },
    desktop: {
      cityOverview: 11,
      cityDetail: 12.5,
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
        "Here we see NO₂ air pollution across the city. The most polluted areas cluster around highways and major roads – cars being the primary source of this pollutant. The WHO guideline is 10 μg/m³, while Swiss law allows 30 μg/m³.",
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
        "Now let's see how the population is distributed across the city by socioeconomic status. The poorest households cluster near major roads and the city center, while wealthier residents live further away – enjoying cleaner air.",
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
        "The chart below shows every household in St. Gallen plotted by income level and air pollution exposure. Each dot represents a household. The pattern is clear: wealthier families breathe cleaner air, while the poorest bear the burden of pollution.",
      chart: {
        getImage: function () {
          return config.getChartImage("stgallen-no2-scatter");
        },
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
        {
          layer: "hotspots-no2-final-972i4m",
          opacity: 0.8,
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
          layer: "sep-hex-a6zlrk",
          opacity: 0,
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
        "Here we see the stark divide: orange clusters show wealthy households breathing clean air, while red areas reveal poor families trapped in pollution. St. Gallen has the largest inequality gap among Swiss cities. Only 14% of wealthy households face pollution above 15 μg/m³, compared to 63% of the poorest families.",
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
          opacity: 0,
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
          duration: 4000,
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
        'The scatter plot reveals Geneva\'s unique pattern: an "egalitarian" exposure to pollution where rich and poor households breathe similarly polluted air. Urban density has leveled the playing field – at least for air quality.',
      chart: {
        getImage: function () {
          return config.getChartImage("geneva-no2-scatter");
        },
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
          opacity: 0,
          duration: 1000,
        },
        {
          layer: "hotspots-no2-final-972i4m",
          opacity: 0.8,
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
        "Now let's examine vegetation density across the city. The hyper-dense city center leaves little room for greenery, while nature flourishes on the outskirts. In Geneva, green space is a geography of distance.",
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
        "This chart reveals spatial segregation in action. While vegetation is scarce citywide, wealthy households consistently access greener environments than their less affluent neighbors. Nature becomes a luxury good.",
      chart: {
        getImage: function () {
          return config.getChartImage("geneva-green-scatter");
        },
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
          opacity: 0,
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
      ],
    },
    {
      id: "geneva-paradox",
      alignment: "right",
      hidden: false,
      title: "The Geneva paradox",
      description:
        "The final picture is striking: 95% of the poorest households have limited access to green environments, compared to 72% of the wealthiest. In Geneva, density equalizes pollution exposure, but creates stark inequality in access to nature.",
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
          opacity: 0.8,
          duration: 1000,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0.4,
          duration: 1000,
        },
        {
          layer: "hotspots-green-final-72df90",
          opacity: 0.9,
          duration: 2000,
        },
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 0,
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
      id: "transition-lausanne",
      alignment: "right",
      hidden: false,
      title: "Lausanne, dernière étape",
      description:
        "Lausanne, dernière étape. 140'000 habitants sur les collines du Léman.",
      getLocation: function () {
        return config.getLocation(
          config.cities.lausanne,
          "cityOverview",
          45,
          0
        );
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0,
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
      ],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 1,
          duration: 1000,
        },
      ],
    },
    {
      id: "lausanne-double-penalty",
      alignment: "right",
      hidden: false,
      title: "La double peine",
      description:
        "Ici se cumulent tous les désavantages : pollution ET manque d'espaces verts touchent les mêmes quartiers.",
      chart: {
        title: "Cumul des inégalités à Lausanne",
        subtitle: "Pollution, espaces verts et statut social",
        getImage: function () {
          return config.getChartImage("lausanne-green-scatter");
        },
        source: "Source: Offices fédéraux",
      },
      getLocation: function () {
        return config.getLocation(config.cities.lausanne, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "no2-5586-lausanne-15f02e",
          opacity: 0.4,
          duration: 2000,
        },
        {
          layer: "ndvi-5586-lausanne-agregat-288ezd",
          opacity: 0.4,
          duration: 2000,
        },
      ],
      onChapterExit: [],
    },
    {
      id: "lausanne-geography",
      alignment: "right",
      hidden: false,
      title: "La géographie de l'inégalité",
      description:
        "Les quartiers en pente, moins accessibles, concentrent précarité et nuisances. Un exemple de gentrification environnementale.",
      getLocation: function () {
        return config.getLocation(config.cities.lausanne, "cityZoom", 60, 180);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "conclusion",
      alignment: "right",
      hidden: false,
      title: "Trois villes, une réalité",
      description:
        "Trois villes, trois histoires d'inégalités. Mais partout, l'adresse détermine la qualité de l'air qu'on respire.",
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
          layer: "no2-5586-lausanne-15f02e",
          opacity: 0,
          duration: 3000,
        },
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0,
          duration: 3000,
        },
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0,
          duration: 3000,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0,
          duration: 3000,
        },
        {
          layer: "ndvi-5586-lausanne-agregat-288ezd",
          opacity: 0,
          duration: 3000,
        },
      ],
      onChapterExit: [],
    },
  ],
};
