
const apiUrl = '/api/Areas/ListAreas';
const apiUrlGetLocation = 'api/Locations/ListLocations';
let dataListAreas;

document.addEventListener('DOMContentLoaded', function () {
    getAreasAndDisplay();

    //add areas cái này lấy dữ liệu từ form để add 
    document.getElementById('addDataForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const url = window.location.origin + '/api/Areas/InsertAreas';


        const nameAreas = document.getElementById('InputNameAreas').value;
        const idAreas = document.getElementById('InputIDAreas').value;


        const dataToPost = {
            NameAreas: nameAreas,
            IDAreas: idAreas

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
            getAreasAndDisplay();

            // Clear textbox values
            document.getElementById('InputNameAreas').value = '';
            document.getElementById('InputIDAreas').value = '';

        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });

    ///////////////////////////////////////////////////////////////////////////

    //rest table list areas rerest lại tabele hiển thị khi thêm mới hoặc update areas thành công.
    async function getAreasAndDisplay() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log(data);
            dataListAreas = data.map(item => ({
                codeAreas: item.codeAreas,
                nameAreas: item.nameAreas,
                idAreas: item.idAreas
            }));

            displayAreas(dataListAreas);
            console.log(dataListAreas);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }

    function displayAreas(dataListAreas) {
        const tableBody = document.querySelector('#AreasTable tbody');
        tableBody.innerHTML = '';

        dataListAreas.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                 <td>${data.codeAreas}</td>
                 <td>${data.nameAreas}</td>
                 <td>${data.idAreas}</td>

                <td>
                    <button onclick="editAreas('${data.codeAreas}')">UPDATE</button>
                    <button onclick="confirmDeleteAreas('${data.codeAreas}')">DELETE</button>
                    <button onclick="AddLocationsTable('${data.idAreas}')">ADD LOCATIONS</button>
                    <button onclick="LocationsList('${data.idAreas}')">LIST LOCATIONS OF AREAS</button>
               </td>
            `;
            tableBody.appendChild(row);
        });
    }
    //
    //delete areas 
    window.confirmDeleteAreas = function (codeAreas) {
        const shouldDelete = confirm('You want to delete this areas?');
        if (shouldDelete) {
            console.log('Code Delete:', codeAreas);
            deleteAreas(codeAreas);
        }
    };

    async function deleteAreas(codeAreas) {
        console.log('code of delete areas:', codeAreas);
        const deleteUrl = `/api/Areas/DeleteAreas?codeAreas=${codeAreas}`;

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
            alert('DELETE AREAS '+codeAreas+' SUCCESS!');
            getAreasAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    window.editAreas = function (codeAreas) {
        openEditAreasModal(codeAreas);
    };
    function openEditAreasModal(codeAreas) {
        const editModal = document.getElementById('editAreasTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table';
        } else {
            editModal.style.display = 'none';
        }

        const dataEdit = dataListAreas.find(item => item.codeAreas === codeAreas);
        document.getElementById('editCodeAreas').value = dataEdit.codeAreas;
        document.getElementById('editNameAreas').value = dataEdit.nameAreas;
        document.getElementById('editIDAreas').value = dataEdit.idAreas;

        console.log('data edit');
        console.log(dataEdit);
    }

    document.getElementById('saveChangesAreasBtn').addEventListener('click', saveChangesAreas);
    function saveChangesAreas() {
        const editCodeAreas = document.getElementById('editCodeAreas').value;
        const editNameAreas = document.getElementById('editNameAreas').value;
        const editIDAreas = document.getElementById('editIDAreas').value;

        console.log('data save');
        const updateUrl = `/api/Areas/UpdateAreas`;

        const dataToUpdate = {
            codeAreas: editCodeAreas,
            idAreas: editIDAreas,
            nameAreas: editNameAreas

        };
        console.log("data update");
        console.log(dataToUpdate);
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
                    closeEditAreasModal();
                    getAreasAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('ERROR!');
                }
            })
            .catch(error => {
                console.error('SERVER IS NOT RESPONDING!', error);
            });
    }

    function closeEditAreasModal() {
        const editTable = document.getElementById('editAreasTable');
        editTable.style.display = 'none';
    }
    ////////////////////////////////////////////////////////////////////////////////////////




    // thêm locations của areas đó
    window.AddLocationsTable = function (idAreas) {
        openAddLocationsModal(idAreas);
    }

    function openAddLocationsModal(idAreas) {
        const addModal = document.getElementById('AddLocationsTable');
        if (addModal.style.display === 'none') {
            addModal.style.display = 'table';
        } else {
            addModal.style.display = 'none';
        }

        const dataListAreasOfLocation = dataListAreas.find(itemAreas => itemAreas.idAreas === idAreas);
        document.getElementById('IDAreasOfLocations').value = dataListAreasOfLocation.idAreas;
        console.log('data id areas', idAreas);
    }

    document.getElementById('AddLocationsTable').addEventListener('submit', async function (e) {
        e.preventDefault();

        const urlLocations = window.location.origin + '/api/Locations/InsertLocations';

        const nameLocations = document.getElementById('InputNameLocations').value;
        const idLocations = document.getElementById('InputIDLocations').value;
        const idAreas = document.getElementById('IDAreasOfLocations').value;

        const dataLocationsToPost = {
            NameAreas: nameLocations, 
            IDAreas: idLocations, 
            IDLocations: idAreas 
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
            console.log('data', dataLocationsToPost);
            alert('ADD NEW LOCATIONS SUCCESS!');
            /*getAreasAndDisplay();*/
        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });










    window.AddLocationsTable = function (idAreas) {
        LocationsList(idAreas);
    }

    function LocationsList(idAreas) {
        const addModal = document.getElementById('LocationsTable');
        if (addModal.style.display === 'none') {
            addModal.style.display = 'table';
        } else {
            addModal.style.display = 'none';
        }

        const dataListAreasOfLocation = dataListAreas.find(itemAreas => itemAreas.idAreas === idAreas);
        document.getElementById('IDAreasOfLocations').value = dataListAreasOfLocation.idAreas;
        console.log('data id areas', idAreas);
    }

    document.getElementById('AddLocationsTable').addEventListener('submit', async function (e) {
        e.preventDefault();

        const urlLocations = window.location.origin + '/api/Locations/InsertLocations';

        const nameLocations = document.getElementById('InputNameLocations').value;
        const idLocations = document.getElementById('InputIDLocations').value;
        const idAreas = document.getElementById('IDAreasOfLocations').value;

        const dataLocationsToPost = {
            NameAreas: nameLocations,
            IDAreas: idLocations,
            IDLocations: idAreas
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
            console.log('data', dataLocationsToPost);
            alert('ADD NEW LOCATIONS SUCCESS!');
            /*getAreasAndDisplay();*/
        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });

















    






});

