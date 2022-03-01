'use strict'      

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoieW5zbiIsImEiOiJjbDA3M3UzZGcyZHFpM2lsc3lnNXkwbnQ3In0.e8wpn-qOrzM5GlaHyqdhiQ'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/brianhouse/cjn0u552b52kr2spdz6yhpqj4',
    center: [-73.93324, 40.80877],
    zoom: 14
});

var blocks_url = './data/blocks_joined_trees_um.geojson'
var trees_url = 'data/2015_Street_Tree_Census_subset_um.geojson'

  map.on('load',function(){    
      map.addSource('blocks_data',{
        'type':'geojson',
        'data': blocks_url,
      });

      map.addLayer({
        'id':'blocks',
        'type':'fill',
        'source':'blocks_data',
        'paint':{
            'fill-color': 
              ['case', 
              ['==', ['get', 'avg_diamet'], null],
              'white',
              ['step', ['get', 'avg_diamet'],
                '#ffffff',
                2.615, '#edf8e9',
                6.444, '#bae4b3',
                9.379, '#74c476',
                15.036, '#31a354',
                26.000, '#006d2c'
              ]],
          'fill-outline-color':'#000000',
          'fill-opacity': 0.5
        }
      })
    // define a 'source' for your point dataset
    map.addSource('trees_data',{
      'type':'geojson',
      'data': trees_url
    });
    // add a new layer with your points
    map.addLayer({
      'id':'trees',
      'type':'circle',
      'source':'trees_data',
      'paint':{
        'circle-color': '#349f27',
        'circle-opacity':0.7,
        'circle-radius': ['/', ['get', 'tree_dbh'], 5],
      },
    })
      

        // add a new layer with your polygons

      
    });

    
