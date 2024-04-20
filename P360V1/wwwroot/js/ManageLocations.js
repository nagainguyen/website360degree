const apiUrlGetLocation = '/api/Locations/ListLocations';
let dataListLocations;

document.addEventListener('DOMContentLoaded', function () {
    getLocationsAndDisplay();

    document.getElementById('addLocationsForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const urlLocations = window.location.origin + '/api/Locations/InsertLocations';

        const nameLocations = document.getElementById('InputNameLocations').value;
        const idLocations = document.getElementById('InputIDLocations').value;
        const idAreas = document.getElementById('IDAreasOfLocations').value;

        const dataLocationsToPost = {
            NameLocations: nameLocations,
            IDLocations: idLocations,
            IDAreas: idAreas
        };

        try {
            const response = await fetch(urlLocations, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataLocationsToPost),
            });

            if (!response.ok) {
                throw new Error(`ERROR WHEN INSERTING DATA! ${response.status} - ${response.statusText}`);
            }

            console.log('SUCCESS');
            alert('ADD NEW LOCATIONS SUCCESS!');
            getLocationsAndDisplay();
        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });

    async function getLocationsAndDisplay() {
        try {
            const response = await fetch(apiUrlGetLocation);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log('data all location', data);

            dataListLocations = data.map(item => ({
                codeLocation: item.codeLocations,
                idLocation: item.idLocations,
                nameLocation: item.nameLocations,
                idAreas: item.idAreas
            }));

            displayLocations(dataListLocations);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }

    function displayLocations(dataListLocations) {
        const tableBody = document.querySelector('#AreasTable tbody');
        tableBody.innerHTML = '';

        dataListLocations.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${data.codeLocation}</td>
            <td>${data.nameLocation}</td>
            <td>${data.idLocation}</td>
            <td>${data.idAreas}</td>
            <td>
                <button onclick="editLocation('${data.codeLocation}')">UPDATE</button>
                <button onclick="confirmDeleteLocation('${data.codeLocation}')">DELETE</button>
            </td>
        `;
            tableBody.appendChild(row);
        });
    }

    // edit locations
    window.editLocation = function (codeLocation) {
        openEditLocationModal(codeLocation);
    };
    function openEditLocationModal(codeLocation) {
        const editModal = document.getElementById('editLocationTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table';
        } else {
            editModal.style.display = 'none';
        }

        const dataEdit = dataListLocations.find(item => item.codeLocation === codeLocation);

        document.getElementById('editCodeLocation').value = dataEdit.codeLocation;
        document.getElementById('editNameLocation').value = dataEdit.nameLocation;
        document.getElementById('editIDLocation').value = dataEdit.idLocation;
        document.getElementById('editIDAreasLocation').value = dataEdit.idAreas;
    }

    document.getElementById('saveChangesLocationBtn').addEventListener('click', saveChangesLocation);
    function saveChangesLocation() {
        const editCodeLocations = document.getElementById('editCodeLocation').value;
        const editNameLocations = document.getElementById('editNameLocation').value;
        const editIDLocations = document.getElementById('editIDLocation').value;
        const editIDAreas = document.getElementById('editIDAreasLocation').value;

        const updateUrl = '/api/Locations/UpdateLocations';

        const dataToUpdate = {
            CodeLocations: editCodeLocations,
            NameLocations: editNameLocations,
            IDLocations: editIDLocations,
            IDAreas: editIDAreas
        };

        fetch(updateUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
            .then(response => {
                if (response.ok) {
                    console.log('SUCCESS');
                    alert('SUCCESS!');
                    closeEditLocationsModal();
                    getLocationsAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('ERROR!');
                }
            })
            .catch(error => {
                console.error('SERVER IS NOT RESPONDING!', error);
            });
    }

    function closeEditLocationsModal() {
        const editTable = document.getElementById('editLocationTable');
        editTable.style.display = 'none';
    }

    // delete location
    window.confirmDeleteLocation = function (codeLocation) {
        const shouldDelete = confirm('You want to delete this location?');
        if (shouldDelete) {
            console.log('Code Delete:', codeLocation);
            deleteLocation(codeLocation);
        }
    };

    async function deleteLocation(codeLocation) {
        console.log('code of delete location:', codeLocation);
        const deleteUrl = `/api/Locations/DeleteLocations?CodeLocations=${codeLocation}`;

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`ERROR DELETE: ${response.status} - ${response.statusText}`);
            }
            alert('DELETE LOCATION ' + codeLocation + ' SUCCESS!');
            getLocationsAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }
});
