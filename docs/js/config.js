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
  chapters: [
    {
      id: "intro-overview",
      alignment: "right",
      hidden: false,
      title: "St. Gallen from above",
      description:
        "St. Gallen, population 76,000. From above, it looks like a quiet town near Lake Constance. But beneath this apparent uniformity lies one of the most striking environmental inequalities among Switzerland's major cities.",
      getLocation: function () {
        return config.getLocation(
          config.cities.stgallen,
          "cityOverview",
          15,
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
      onChapterExit: [],
    },
    {
      id: "revelation-ses",
      alignment: "right",
      hidden: false,
      title: "The social geography",
      description:
        "Each hexagon represents households, with the color corresponding to their dominant socioeconomic status. Red: low income. Orange: high income.",
      getLocation: function () {
        return config.getLocation(config.cities.stgallen, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [
        {
          layer: "sep-hex-a6zlrk",
          opacity: 1,
          duration: 2000,
        },
      ],
      onChapterExit: [],
    },
    {
      id: "pollution-shock",
      alignment: "right",
      hidden: false,
      title: "Air pollution",
      description:
        "Ajoutons maintenant la pollution à l'air. Les zones rouges dépassent les seuils de l'OMS.",
      chart: {
        getImage: function () {
          return config.getChartImage("stgallen-no2-scatter");
        },
      },
      getLocation: function () {
        return config.getLocation(config.cities.stgallen, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [
        {
          layer: "no2-3203-stgallen-b3xclo",
          opacity: 0.8,
          duration: 2000,
        },
        {
          layer: "sep-hex-a6zlrk",
          opacity: 0, // Hide socio-economic layer
          duration: 1000,
        },
      ],
      onChapterExit: [],
    },
    {
      id: "explanation-stgallen",
      alignment: "right",
      hidden: false,
      title: "L'écart révélateur",
      description:
        "63% des ménages modestes respirent un air pollué, contre seulement 14% des ménages aisés. Un écart de 49 points - le record suisse.",
      getLocation: function () {
        return config.getLocation(config.cities.stgallen, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [],
      onChapterExit: [
        {
          layer: "cities-7uq93l",
          opacity: 0,
          duration: 1000,
        },
      ],
    },
    {
      id: "transition-geneva",
      alignment: "right",
      hidden: false,
      title: "Direction Genève",
      description:
        "Direction Genève, 200'000 habitants. Une ville dense, internationale, au bord du lac.",
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityOverview", 45, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "no2-3203-stgallen-b3xclo",
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
      id: "geneva-pollution-surprise",
      alignment: "right",
      hidden: false,
      title: "Première surprise",
      description:
        "Première surprise : riches et pauvres respirent pratiquement le même air pollué.",
      chart: {
        title: "Pollution NO₂ à Genève",
        subtitle: "Quasi-égalité face à la pollution",
        getImage: function () {
          return config.getChartImage("geneva-no2-scatter");
        },
        source: "Source: Office fédéral de l'environnement",
      },
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0.5,
          duration: 2000,
        },
      ],
      onChapterExit: [],
    },
    {
      id: "geneva-green-revelation",
      alignment: "right",
      hidden: false,
      title: "Mais la nature reste un privilège",
      description:
        "Mais la nature, elle, reste un privilège. Les espaces verts se concentrent dans les quartiers aisés.",
      chart: {
        title: "Espaces verts à Genève",
        subtitle: "Accès inégal à la nature",
        getImage: function () {
          return config.getChartImage("geneva-green-scatter");
        },
        source: "Source: Office fédéral de la statistique",
      },
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 30, 0);
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "no2-6621-genve-d5em82",
          opacity: 0,
          duration: 1000,
        },
        {
          layer: "ndvi-6621-genve-agregat-byj24i",
          opacity: 0.7,
          duration: 2000,
        },
      ],
      onChapterExit: [],
    },
    {
      id: "geneva-contrast",
      alignment: "right",
      hidden: false,
      title: "Le paradoxe genevois",
      description:
        "À Genève, la densité égalise la pollution, mais creuse l'accès à la nature.",
      getLocation: function () {
        return config.getLocation(config.cities.geneva, "cityDetail", 60, 90);
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      onChapterEnter: [],
      onChapterExit: [],
    },
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
