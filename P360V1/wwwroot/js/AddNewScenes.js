document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('addDataForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const url = window.location.origin + '/api/Scenes/InsertScenes';

        
        const idLocations = document.getElementById('InputIDLocations').value;
        const idScenes = document.getElementById('InputIDScenes').value;
        const titleScenes = document.getElementById('InputTitle').value;
        const urlScenes = document.getElementById('InputURL').value;
        const pitchScenes = parseFloat(document.getElementById('InputPitch').value);
        const yawScenes = parseFloat(document.getElementById('InputYaw').value);

        const dataToPost = {
            IDLocations : idLocations,
            IDScenes: idScenes,
            TitleScenes: titleScenes,
            UrlScenes: urlScenes,
            PitchScenes: pitchScenes,
            YawScenes: yawScenes
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToPost),
            });

            if (response.ok) {
                console.log('SUCCESS');
                alert('ADD NEW SCENES SUCCESS!');
                getScenesAndDisplay();

                // Clear textbox values
                document.getElementById('InputIDLocations').value = '';
                document.getElementById('InputIDScenes').value = '';
                document.getElementById('InputTitle').value = '';
                document.getElementById('InputURL').value = '';
                document.getElementById('InputPitch').value = '';
                document.getElementById('InputYaw').value = '';
            } else {
                console.error('FAIL');
                alert('ERROR!');
            }
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    });

  
});
