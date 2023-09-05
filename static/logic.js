console.log("Just checking if logic.js is working");

// Define the API URL
let url = 'http://127.0.0.1:5503/api';

// Get references for html elements
const danceabilitySlider = document.getElementById("danceability-slider");
const energySlider = document.getElementById("energy-slider");
const keyDropdown = document.getElementById("key-dropdown");
const loudnessSlider = document.getElementById("loudness-slider");
const modeDropdown = document.getElementById("mode-dropdown");
const speechinessSlider = document.getElementById("speechiness-slider");
const acousticnessSlider = document.getElementById("acousticness-slider");
const instrumentalnessSlider = document.getElementById("instrumentalness-slider");
const livenessSlider = document.getElementById("liveness-slider");
const valenceSlider = document.getElementById("valence-slider");
const tempoSlider = document.getElementById("tempo-slider");
const duration_msSlider = document.getElementById("duration_ms-slider");
const timeSignatureDropdown = document.getElementById("time_signature-dropdown");
const chorus_hitSlider = document.getElementById("chorus_hit-slider");
const sectionsSlider = document.getElementById("sections-slider");
const valueLabel = document.getElementById("value-label");
valueLabel.textContent = `Danceability: ${danceabilitySlider.value} | Energy: ${energySlider.value} | Key: ${keyDropdown.value} | Loudness: ${loudnessSlider.value} |
Mode: ${modeDropdown.value} | Speechiness: ${speechinessSlider.value} | Acousticness: ${acousticnessSlider.value} | Instrumentalness: ${instrumentalnessSlider.value} |
Liveness: ${livenessSlider.value} | Valence: ${valenceSlider.value} | Tempo: ${tempoSlider.value} | Duration_ms: ${duration_msSlider.value} |
Time_signature: ${timeSignatureDropdown.value} | Chorus_hit: ${chorus_hitSlider.value} | Sections: ${sectionsSlider.value}`;

// Fetch data using D3.json
d3.json(url).then(data => {
    console.log("Fetched data:", data);

    // Extract min and max values for different attributes
    const danceabilityValues = data.map(song => song.danceability);
    const energyValues = data.map(song => song.energy);
    const uniqueKeyValues = [...new Set(data.map(song => song.key))];
    const loudnessValues = data.map(song => song.loudness);
    const uniqueModeValues = [...new Set(data.map(song => song.mode))];
    const speechinessValues = data.map(song => song.speechiness);
    const acousticnessValues = data.map(song => song.acousticness);
    const instrumentalnessValues = data.map(song => song.instrumentalness);
    const livenessValues = data.map(song => song.liveness);
    const valenceValues = data.map(song => song.valence);
    const tempoValues = data.map(song => song.tempo);
    const duration_msValues = data.map(song => song.duration_ms);
    const uniqueTimeSignatureValues = [...new Set(data.map(song => song.time_signature))];
    const chorus_hitValues = data.map(song => song.chorus_hit);
    const sectionsValues = data.map(song => song.sections);

    const minDanceability = Math.min(...danceabilityValues);
    const maxDanceability = Math.max(...danceabilityValues);
    const minEnergy = Math.min(...energyValues);
    const maxEnergy = Math.max(...energyValues);
    const minLoudness = Math.min(...loudnessValues);
    const maxLoudness = Math.max(...loudnessValues)
    const minSpeechiness = Math.min(...speechinessValues);
    const maxSpeechiness = Math.max(...speechinessValues);
    const minAcousticness = Math.min(...acousticnessValues);
    const maxAcousticness = Math.max(...acousticnessValues);
    const minInstrumentalness = Math.min(...instrumentalnessValues);
    const maxInstrumentalness = Math.max(...instrumentalnessValues);
    const minLiveness = Math.min(...livenessValues);
    const maxLiveness = Math.max(...livenessValues);
    const minValence = Math.min(...valenceValues);
    const maxValence = Math.max(...valenceValues);
    const minTempo = Math.min(...tempoValues);
    const maxTempo = Math.max(...tempoValues);
    const minDuration_ms = Math.min(...duration_msValues);
    const maxDuration_ms = Math.max(...duration_msValues);
    const minChorus_hit = Math.min(...chorus_hitValues);
    const maxChorus_hit = Math.max(...chorus_hitValues);
    const minSections = Math.min(...sectionsValues);
    const maxSections = Math.max(...sectionsValues);

    // Set slider attributes
    danceabilitySlider.min = minDanceability;
    danceabilitySlider.max = maxDanceability;
    danceabilitySlider.step = 0.01;
    energySlider.min = minEnergy;
    energySlider.max = maxEnergy;
    energySlider.step = 0.01;
    loudnessSlider.min = minLoudness;
    loudnessSlider.max = maxLoudness;
    loudnessSlider.step = 1;
    speechinessSlider.min = minSpeechiness;
    speechinessSlider.max = maxSpeechiness;
    speechinessSlider.step = 0.01;
    acousticnessSlider.min = minAcousticness;
    acousticnessSlider.max = maxAcousticness;
    acousticnessSlider.step = 0.01;
    instrumentalnessSlider.min = minInstrumentalness;
    instrumentalnessSlider.max = maxInstrumentalness;
    instrumentalnessSlider.step = 0.01;
    livenessSlider.min = minLiveness;
    livenessSlider.max = maxLiveness;
    livenessSlider.step = 0.01;
    valenceSlider.min = minValence;
    valenceSlider.max = maxValence;
    valenceSlider.step = 0.01;
    tempoSlider.min = minTempo;
    tempoSlider.max = maxTempo;
    tempoSlider.step = 10;
    duration_msSlider.min = minDuration_ms;
    duration_msSlider.max = maxDuration_ms;
    duration_msSlider.step = 15000;
    chorus_hitSlider.min = minChorus_hit;
    chorus_hitSlider.max = maxChorus_hit;
    chorus_hitSlider.step = 15;
    sectionsSlider.min = minSections;
    sectionsSlider.max = maxSections;
    sectionsSlider.step = 1;

    uniqueKeyValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        keyDropdown.appendChild(option);
    });
    uniqueModeValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        modeDropdown.appendChild(option);
    });
    uniqueTimeSignatureValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        timeSignatureDropdown.appendChild(option);
    });

    const handleSelectorChange = () => {
        const percentage = 0.3; // Adjust this percentage as needed

        const danceabilityFilterOn = document.getElementById("danceability-filter").checked;
        const energyFilterOn = document.getElementById("energy-filter").checked;
        const keyFilterOn = document.getElementById("key-filter").checked;
        const loudnessFilterOn = document.getElementById("loudness-filter").checked;
        const modeFilterOn = document.getElementById("mode-filter").checked;
        const speechinessFilterOn = document.getElementById("speechiness-filter").checked;
        const acousticnessFilterOn = document.getElementById("acousticness-filter").checked;
        const instrumentalnessFilterOn = document.getElementById("instrumentalness-filter").checked;
        const livenessFilterOn = document.getElementById("liveness-filter").checked;
        const valenceFilterOn = document.getElementById("valence-filter").checked;
        const tempoFilterOn = document.getElementById("tempo-filter").checked;
        const duration_msFilterOn = document.getElementById("duration_ms-filter").checked;
        const time_signatureFilterOn = document.getElementById("time_signature-filter").checked;
        const chorus_hitFilterOn = document.getElementById("chorus_hit-filter").checked;
        const sectionsFilterOn = document.getElementById("sections-filter").checked;

        const selectedDanceability = parseFloat(danceabilitySlider.value);
        const selectedEnergy = parseFloat(energySlider.value);
        const selectedKey = parseFloat(keyDropdown.value);
        const selectedLoudness = parseFloat(loudnessSlider.value);
        const selectedMode = parseFloat(modeDropdown.value);
        const selectedSpeechiness = parseFloat(speechinessSlider.value);
        const selectedAcousticness = parseFloat(acousticnessSlider.value);
        const selectedInstrumentalness = parseFloat(instrumentalnessSlider.value);
        const selectedLiveness = parseFloat(livenessSlider.value);
        const selectedValence = parseFloat(valenceSlider.value);
        const selectedTempo = parseFloat(tempoSlider.value);
        const selectedDuration_ms = parseFloat(duration_msSlider.value);
        const selectedTime_signature = parseFloat(modeDropdown.value);
        const selectedChorus_hit = parseFloat(chorus_hitSlider.value);
        const selectedSections = parseFloat(sectionsSlider.value);
    
        valueLabel.textContent = `Danceability: ${selectedDanceability} | Energy: ${selectedEnergy} | Key: ${selectedKey} | Loudness: ${selectedLoudness} | Mode: ${selectedMode} | Speechiness: ${selectedSpeechiness} | Acousticness: ${selectedAcousticness} | Instrumentalness: ${selectedInstrumentalness} | Liveness: ${selectedLiveness} | Valence: ${selectedValence} | Tempo: ${selectedTempo} | Duration_ms: ${selectedDuration_ms} | Time_signature: ${selectedTime_signature} | Chorus_hit: ${selectedChorus_hit} | Sections: ${selectedSections}`;

        // Calculate the ranges based on percentage
        const danceabilityRange = percentage * (maxDanceability - minDanceability);
        const energyRange = percentage * (maxEnergy - minEnergy);
        const loudnessRange = percentage * (maxLoudness - minLoudness);
        const speechinessRange = percentage * (maxSpeechiness - minSpeechiness);
        const acousticnessRange = percentage * (maxAcousticness - minAcousticness);
        const instrumentalnessRange = percentage * (maxInstrumentalness - minInstrumentalness);
        const livenessRange = percentage * (maxLiveness - minLiveness);
        const valenceRange = percentage * (maxValence - minValence);
        const tempoRange = percentage * (maxTempo - minTempo);
        const duration_msRange = percentage * (maxDuration_ms - minDuration_ms);
        const chorus_hitRange = percentage * (maxChorus_hit - minChorus_hit);
        const sectionsRange = percentage * (maxSections - minSections);

    // Filter and process data based on the selected values within the ranges
        const filteredData = data.filter(song => {
            const danceabilityMatch = !danceabilityFilterOn || (Math.abs(song.danceability - selectedDanceability) <= danceabilityRange);
            const energyMatch = !energyFilterOn || (Math.abs(song.energy - selectedEnergy) <= energyRange);
            const keyMatch = !keyFilterOn || (song.key = selectedKey);
            const loudnessMatch = !loudnessFilterOn || (Math.abs(song.loudness - selectedLoudness) <= loudnessRange);
            const modeMatch = !modeFilterOn || (song.mode = selectedMode);
            const speechinessMatch = !speechinessFilterOn || (Math.abs(song.speechiness - selectedSpeechiness) <= speechinessRange);
            const acousticnessMatch = !acousticnessFilterOn || (Math.abs(song.acousticness - selectedAcousticness) <= acousticnessRange);
            const instrumentalnessMatch = !instrumentalnessFilterOn || (Math.abs(song.instrumentalness - selectedInstrumentalness) <= instrumentalnessRange);
            const livenessMatch = !livenessFilterOn || (Math.abs(song.liveness - selectedLiveness) <= livenessRange);
            const valenceMatch = !valenceFilterOn || (Math.abs(song.valence - selectedValence) <= valenceRange);
            const tempoMatch = !tempoFilterOn || (Math.abs(song.tempo - selectedTempo) <= tempoRange);
            const duration_msMatch = !duration_msFilterOn || (Math.abs(song.duration_ms - selectedDuration_ms) <= duration_msRange);
            const time_signatureMatch = !time_signatureFilterOn || (song.time_signature = selectedTime_signature);
            const chorus_hitMatch = !chorus_hitFilterOn || (Math.abs(song.chorus_hit - selectedChorus_hit) <= chorus_hitRange);
            const sectionsMatch = !sectionsFilterOn || (Math.abs(song.sections - selectedSections) <= sectionsRange);
        
            return danceabilityMatch && energyMatch && keyMatch && loudnessMatch && modeMatch && speechinessMatch && acousticnessMatch && instrumentalnessMatch && livenessMatch && valenceMatch && tempoMatch && duration_msMatch && time_signatureMatch && chorus_hitMatch && sectionsMatch;
        });
        
        
            // Display the artist, track, and URL for the filtered songs
            const filteredSongsContainer = document.getElementById("filtered-songs");
            filteredSongsContainer.innerHTML = ""; // Clear previous content

            filteredData.forEach(song => {
                const songDetails = document.createElement("div");
                //check if song is a hit or not
                const hitContent = song.hit === 0 ? "No =(" : (song.hit === 1 ? "Yes =)" : "Unknown");
            
                songDetails.innerHTML = `
                    <h4 style="background-color: rgb(242, 204, 143);">Artist: ${song.artist}</h4>
                    <p>Track: ${song.track}</p>
                    <p>Hit: ${hitContent}</p>
                    <p>URL: <a href="${song.url}" target="_blank">${song.url}</a></p>
                `;
                filteredSongsContainer.appendChild(songDetails);
            });
        };

    // Event listener for selectors changes
    danceabilitySlider.addEventListener("input", handleSelectorChange);
    energySlider.addEventListener("input", handleSelectorChange);
    keyDropdown.addEventListener("change", handleSelectorChange);
    loudnessSlider.addEventListener("input", handleSelectorChange);
    modeDropdown.addEventListener("change", handleSelectorChange);
    speechinessSlider.addEventListener("input", handleSelectorChange);
    acousticnessSlider.addEventListener("input", handleSelectorChange);
    instrumentalnessSlider.addEventListener("input", handleSelectorChange);
    livenessSlider.addEventListener("input", handleSelectorChange);
    valenceSlider.addEventListener("input", handleSelectorChange);
    tempoSlider.addEventListener("input", handleSelectorChange);
    duration_msSlider.addEventListener("input", handleSelectorChange);
    timeSignatureDropdown.addEventListener("change", handleSelectorChange);
    chorus_hitSlider.addEventListener("input", handleSelectorChange);
    sectionsSlider.addEventListener("input", handleSelectorChange);

    document.getElementById("danceability-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("energy-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("key-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("loudness-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("mode-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("speechiness-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("acousticness-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("instrumentalness-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("liveness-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("valence-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("tempo-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("duration_ms-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("time_signature-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("chorus_hit-filter").addEventListener("change", handleSelectorChange);
    document.getElementById("sections-filter").addEventListener("change", handleSelectorChange);

}).catch(error => {
    console.error("Error fetching data:", error);
});

function predict() {
    // Get the input values from the sliders and dropdowns
    const input_data = {
        danceability: parseFloat(danceabilitySlider.value),
        energy: parseFloat(energySlider.value),
        key: parseFloat(keyDropdown.value),
        loudness: parseFloat(loudnessSlider.value),
        mode: parseFloat(modeDropdown.value),
        speechiness: parseFloat(speechinessSlider.value),
        acousticness: parseFloat(acousticnessSlider.value),
        instrumentalness: parseFloat(instrumentalnessSlider.value),
        liveness: parseFloat(livenessSlider.value),
        valence: parseFloat(valenceSlider.value),
        tempo: parseFloat(tempoSlider.value),
        duration_ms: parseFloat(duration_msSlider.value),
        time_signature: parseFloat(timeSignatureDropdown.value),
        chorus_hit: parseFloat(chorus_hitSlider.value),
        sections: parseFloat(sectionsSlider.value)
    };

    // Log the input_data to the console for debugging
    console.log("Input Data:", input_data);

    // Send a POST request to the Flask API for prediction
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5503/predict',
        data: JSON.stringify(input_data), 
        contentType: 'application/json',
        dataType: 'json',
        success: function(response) {
            // Display the response in the HTML element with id "prediction-result"
            const predictionResultElement = document.getElementById("prediction-result");
        
            // Check the response for the prediction value
            if (response && response.prediction) {
                predictionResultElement.textContent = "Prediction: " + response.prediction;
            } else {
                predictionResultElement.textContent = "Prediction not available.";
            }
        }
    });
}