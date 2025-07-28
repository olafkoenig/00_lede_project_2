console.log("=== main.js loaded ===");
console.log("config object:", config);
console.log(
  "Mapbox token:",
  "pk.eyJ1IjoiZmFsb2dpbmtvIiwiYSI6ImNsN3JvOWM5ZDBoZTAzcnBsNGs3c2czc3YifQ.WOXaAsqGUbIVOguojJAbuA"
);

// Main scrollytelling functionality
(function () {
  "use strict";

  // Layer management helper functions
  const LayerManager = {
    layerTypes: {
      fill: ["fill-opacity"],
      line: ["line-opacity"],
      circle: ["circle-opacity", "circle-stroke-opacity"],
      symbol: ["icon-opacity", "text-opacity"],
      raster: ["raster-opacity"],
      "fill-extrusion": ["fill-extrusion-opacity"],
      heatmap: ["heatmap-opacity"],
    },

    getLayerPaintType: function (layer) {
      if (!map.getLayer(layer)) {
        console.warn(`Layer ${layer} not found`);
        return [];
      }
      const layerType = map.getLayer(layer).type;
      return this.layerTypes[layerType] || [];
    },

    setLayerOpacity: function (layerConfig) {
      console.log(
        "Trying to set opacity for layer:",
        layerConfig.layer,
        "to",
        layerConfig.opacity
      );

      const paintProps = LayerManager.getLayerPaintType(layerConfig.layer); // Changé ici !
      console.log("Paint properties for this layer:", paintProps);

      paintProps.forEach(function (prop) {
        let options = {};
        if (layerConfig.duration) {
          const transitionProp = prop + "-transition";
          options = { duration: layerConfig.duration };
          map.setPaintProperty(layerConfig.layer, transitionProp, options);
        }
        console.log(
          `Setting ${prop} to ${layerConfig.opacity} for layer ${layerConfig.layer}`
        );
        map.setPaintProperty(
          layerConfig.layer,
          prop,
          layerConfig.opacity,
          options
        );
      });
    },
  };

  // Fonction globale pour reset des layers
  function resetAllLayers() {
    const layersToReset = [
      "sep-hex-a6zlrk",
      "no2-3203-stgallen-b3xclo",
      "no2-6621-genve-d5em82",
      "no2-5586-lausanne-15f02e",
      "ndvi-6621-genve-agregat-byj24i",
      "ndvi-5586-lausanne-agregat-288ezd",
      "hotspots-no2-final-972i4m",
      "hotspots-green-final-72df90",
      "hotspots-noise-final-avjjjy",
    ];

    layersToReset.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, "fill-opacity", 0);
      }
    });
  }

  // Alignment mapping
  const alignments = {
    left: "lefty",
    center: "centered",
    right: "righty",
    full: "fully",
  };

  // Initialize the story
  function initializeStory() {
    const story = document.getElementById("story");
    const features = document.createElement("div");
    features.setAttribute("id", "features");

    // Create chapters
    config.chapters.forEach((record, idx) => {
      const container = document.createElement("div");
      const chapter = document.createElement("div");

      // Add title
      if (record.title) {
        const title = document.createElement("h3");
        title.innerText = record.title;
        chapter.appendChild(title);
      }

      // Add description
      if (record.description) {
        const description = document.createElement("p");
        description.innerHTML = record.description;
        chapter.appendChild(description);
      }

      // Add chart if present
      if (record.chart) {
        const chartContainer = createChartContainer(record.chart);
        chapter.appendChild(chartContainer);
      }

      // Set up container
      container.setAttribute("id", record.id);
      container.classList.add("step");
      if (idx === 0) {
        container.classList.add("active");
      }

      // Set theme and alignment
      chapter.classList.add(config.theme);
      container.appendChild(chapter);
      container.classList.add(alignments[record.alignment] || "righty");

      if (record.hidden) {
        container.classList.add("hidden");
      }

      features.appendChild(container);
    });

    story.appendChild(features);

    //     // Add footer
    //     const footer = document.createElement("div");
    //     footer.setAttribute("id", "footer");
    //     footer.innerHTML =
    //       "<p>Source: Offices fédéraux de l'environnement et de la statistique<br>Réalisé avec Mapbox</p>";
    //     story.appendChild(footer);
  }

  // Create chart container with responsive image handling
  function createChartContainer(chartConfig) {
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container");

    if (chartConfig.title) {
      const chartTitle = document.createElement("div");
      chartTitle.classList.add("chart-title");
      chartTitle.innerText = chartConfig.title;
      chartContainer.appendChild(chartTitle);
    }

    if (chartConfig.subtitle) {
      const chartSubtitle = document.createElement("div");
      chartSubtitle.classList.add("chart-subtitle");
      chartSubtitle.innerText = chartConfig.subtitle;
      chartContainer.appendChild(chartSubtitle);
    }

    if (chartConfig.getImage || chartConfig.image) {
      const chartImage = document.createElement("img");
      // Use responsive image function if available, otherwise fallback to static image
      chartImage.src = chartConfig.getImage
        ? chartConfig.getImage()
        : chartConfig.image;
      chartImage.alt = chartConfig.title || "Graphique";
      chartContainer.appendChild(chartImage);
    }

    if (chartConfig.source) {
      const chartSource = document.createElement("div");
      chartSource.classList.add("chart-source");
      chartSource.innerText = chartConfig.source;
      chartContainer.appendChild(chartSource);
    }

    return chartContainer;
  }

  // Initialize Mapbox
  function initializeMap() {
    mapboxgl.accessToken = config.accessToken;

    const firstChapter = config.chapters[0];
    const firstLocation = firstChapter.getLocation
      ? firstChapter.getLocation()
      : firstChapter.location;

    window.map = new mapboxgl.Map({
      container: "map",
      style: config.style,
      center: firstLocation.center,
      zoom: firstLocation.zoom,
      bearing: firstLocation.bearing,
      pitch: firstLocation.pitch,
      interactive: false,
      projection: config.projection,
    });

    return window.map;
  }

  // Initialize scrollama
  function initializeScrollytelling() {
    const scroller = scrollama();
    const mapElement = document.getElementById("map");

    scroller
      .setup({
        step: ".step",
        offset: 0.5,
        progress: true,
      })
      .onStepEnter(async (response) => {
        // Show map when first step enters
        if (response.index === 0) {
          mapElement.classList.add("active");
        }

        const current_chapter = config.chapters.findIndex(
          (chap) => chap.id === response.element.id
        );
        const chapter = config.chapters[current_chapter];

        response.element.classList.add("active");

        // Get location (responsive or static)
        const location = chapter.getLocation
          ? chapter.getLocation()
          : chapter.location;
        map[chapter.mapAnimation || "flyTo"](location);

        // Handle layer transitions
        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(LayerManager.setLayerOpacity);
        }

        // Execute callback if present
        if (chapter.callback) {
          window[chapter.callback]();
        }

        // Handle rotation animation
        if (chapter.rotateAnimation) {
          map.once("moveend", () => {
            const currentBearing = map.getBearing();

            // Rotation continue avec un seul rotateTo mais plus long
            map.rotateTo(currentBearing + 180, {
              // Demi-tour depuis position actuelle
              duration: 120000, // 120 secondes
              easing: function (t) {
                return t; // Linéaire
              },
            });
          });
        }

        // Auto advance if enabled
        if (config.auto) {
          const next_chapter = (current_chapter + 1) % config.chapters.length;
          map.once("moveend", () => {
            document
              .querySelectorAll(
                '[data-scrollama-index="' + next_chapter.toString() + '"]'
              )[0]
              .scrollIntoView();
          });
        }
      })
      .onStepExit((response) => {
        const chapter = config.chapters.find(
          (chap) => chap.id === response.element.id
        );
        response.element.classList.remove("active");

        // Hide map when last step exits
        if (
          response.index === config.chapters.length - 1 &&
          response.direction === "down"
        ) {
          mapElement.classList.remove("active");
        }
        // Show map when coming back to scrollytelling from below
        if (
          response.index === config.chapters.length - 1 &&
          response.direction === "up"
        ) {
          mapElement.classList.add("active");
        }

        if (chapter.onChapterExit.length > 0) {
          chapter.onChapterExit.forEach(LayerManager.setLayerOpacity);
        }
      });

    return scroller;
  }

  // Handle window resize for responsive behavior
  function handleResize() {
    // Update chart images on resize
    config.chapters.forEach((chapter) => {
      if (chapter.chart && chapter.chart.getImage) {
        const chartImg = document.querySelector(`#${chapter.id} img`);
        if (chartImg) {
          chartImg.src = chapter.chart.getImage();
        }
      }
    });
  }

  // Initialize everything when DOM is loaded
  function initialize() {
    initializeStory();
    const map = initializeMap();

    map.on("load", function () {
      // Masquer tous les layers SAUF les frontières au démarrage
      const layersToHide = [
        "sep-hex-a6zlrk", // households
        "no2-3203-stgallen-b3xclo", // pollution St. Gallen
        "no2-6621-genve-d5em82", // pollution Genève
        "no2-5586-lausanne-15f02e", // pollution Lausanne
        "ndvi-6621-genve-agregat-byj24i", // espaces verts Genève
        "ndvi-5586-lausanne-agregat-288ezd", // espaces verts Lausanne
        "hotspots-noise-final-avjjjy", // hotspots noise
        "hotspots-no2-final-972i4m", // hotspots no2
        "hotspots-green-final-72df90", // hotspots ndvi
      ];

      layersToHide.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setPaintProperty(layerId, "fill-opacity", 0);
        }
      });

      // Garder visible les frontières
      if (map.getLayer("cities-7uq93l")) {
        map.setPaintProperty("cities-7uq93l", "line-opacity", 1);
      }

      // Add 3D terrain if enabled
      if (config.use3dTerrain) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
        map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 0.0],
            "sky-atmosphere-sun-intensity": 15,
          },
        });
      }

      // Initialize scrollytelling
      initializeScrollytelling();

      // Auto start if enabled
      if (config.auto) {
        document
          .querySelectorAll('[data-scrollama-index="0"]')[0]
          .scrollIntoView();
      }
    });

    // Handle resize events
    window.addEventListener("resize", handleResize);
  }

  // Start when page loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
