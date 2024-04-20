document.addEventListener('DOMContentLoaded', function () {
    const apiUrlScenes = '/api/Scenes/ListScenes';
    const apiUrlLocations = '/api/Locations/ListLocations';
    let dataListScenes;
    let dataListLocations;

    async function getScenesAndDisplay() {
        try {
            const responseScenes = await fetch(apiUrlScenes);
            if (!responseScenes.ok) {
                throw new Error(`ERROR WHEN RETRIEVING SCENES! ${responseScenes.status} - ${responseScenes.statusText}`);
            }
            const { data } = await responseScenes.json();
            dataListScenes = data;
            displayImages(dataListScenes);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING SCENES!', error);
        }
    }

    async function getLocationAndDisplay() {
        try {
            const responseLocations = await fetch(apiUrlLocations);
            if (!responseLocations.ok) {
                throw new Error(`ERROR WHEN RETRIEVING LOCATIONS! ${responseLocations.status} - ${responseLocations.statusText}`);
            }
            const { data } = await responseLocations.json();
            dataListLocations = data;
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING LOCATIONS!', error);
        }
    }

    async function checkScenesExistence(IDScenes) {
        try {
            const existingScenes = dataListScenes.find(scene => scene.IDScenes === IDScenes);
            return !!existingScenes;
        } catch (error) {
            console.error('ERROR WHEN CHECKING SCENES EXISTENCE!', error);
            return false;
        }
    }

    async function checkLocationExistence(IDLocation) {
        try {
            const existingLocation = dataListLocations.find(location => location.IDLocation === IDLocation);
            return !!existingLocation;
        } catch (error) {
            console.error('ERROR WHEN CHECKING LOCATION EXISTENCE!', error);
            return false;
        }
    }

    document.getElementById('addDataForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const idLocations = document.getElementById('InputIDLocations').value;
        const idScenes = document.getElementById('InputIDScenes').value;
        const titleScenes = document.getElementById('InputTitle').value;
        const urlScenes = document.getElementById('InputURL').value;
        const pitchScenes = parseFloat(document.getElementById('InputPitch').value);
        const yawScenes = parseFloat(document.getElementById('InputYaw').value);

        if (!idLocations || !idScenes || !titleScenes || !urlScenes || isNaN(pitchScenes) || isNaN(yawScenes)) {
            alert('Please fill in all fields.');
            return;
        }

        const isScenesExisting = await checkScenesExistence(idScenes);
        if (isScenesExisting) {
            alert('IDScenes already exists. Please enter a different IDScenes.');
            return;
        }

        const isLocationExisting = await checkLocationExistence(idLocations);
        if (!isLocationExisting) {
            alert('IDLocation does not exist. Please enter a valid IDLocation.');
            return;
        }

        const url = window.location.origin + '/api/Scenes/InsertScenes';

        const dataToPost = {
            IDLocations: idLocations,
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

            if (!response.ok) {
                throw new Error(`ERROR WHEN INSERTING DATA! ${response.status} - ${response.statusText}`);
            }

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
        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });

    // Gọi hàm để lấy và hiển thị Scenes và Locations khi trang được load
    getScenesAndDisplay();
    getLocationAndDisplay();
});
