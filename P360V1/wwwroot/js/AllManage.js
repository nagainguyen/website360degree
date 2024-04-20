
const apiUrl = '/api/Areas/ListAreas';
const apiUrlGetLocation = 'api/Locations/ListLocations';
const apiUrlGetScenes = 'api/Scenes/ListScenes';
const apiUrlGetHotSpots = 'api/HotSpots/ListHotSpots'
let dataListAreas;
let dataListLocations;
let dataListScenes;
let dataListHotSpots;

const loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
   
    let userData = JSON.parse(loggedInUser);
   
} else {
    window.location.href = '/Accounts/Logins';
}

document.addEventListener('DOMContentLoaded', function () {
    getAreasAndDisplay();

    //add areas cái này lấy dữ liệu từ form để add 
    document.getElementById('addDataForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('InputNameAreas');
        const idInput = document.getElementById('InputIDAreas');
        const urlInput = document.getElementById('InputUrlImageAreas');
        if (!nameInput.value.trim() || !idInput.value.trim() || !urlInput.value.trim()) {
            event.preventDefault(); // Ngăn chặn việc submit form nếu có ô nhập trống
            document.getElementById('nameError').innerText = !nameInput.value.trim() ? 'Vui lòng nhập tên khu vực.' : '';
            document.getElementById('idError').innerText = !idInput.value.trim() ? 'Vui lòng nhập mã khu vực.' : '';
            document.getElementById('urlError').innerText = !urlInput.value.trim() ? 'Vui lòng nhập đường dẫn hình ảnh.' : '';
        } else {
            document.getElementById('nameError').innerText = '';
            document.getElementById('idError').innerText = '';
            document.getElementById('urlError').innerText = '';
        }

        if (/\s/.test(idInput.value)) {
            event.preventDefault(); // Ngăn chặn việc submit form nếu có khoảng trắng trong mã khu vực
            document.getElementById('idError').innerText = 'Mã khu vực không được chứa khoảng trắng.';
        }

        if (/\s/.test(urlInput.value)) {
            event.preventDefault(); // Ngăn chặn việc submit form nếu có khoảng trắng trong đường dẫn hình ảnh
            document.getElementById('urlError').innerText = 'Đường dẫn hình ảnh minh họa không được chứa khoảng trắng.';
        }

        const url = window.location.origin + '/api/Areas/InsertAreas';


        const nameAreas = document.getElementById('InputNameAreas').value;
        const idAreas = document.getElementById('InputIDAreas').value;
        const urlImageAreas = document.getElementById('InputUrlImageAreas').value;
      /*  const codeAccount = userData.codeAccount;*/
        const dataToPost = {
            NameAreas: nameAreas,
            IDAreas: idAreas,
            UrlImageAreas: urlImageAreas,
         /*   CodeAccount: codeAccount*/

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
            alert('DELETE AREAS ' + codeAreas + ' SUCCESS!');
            getAreasAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //edit areas
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

        const table = document.getElementById('AddLocationsTable');
        if (table) {
            if (table.style.display === 'none') {
                table.style.display = 'table';
            } else {
                table.style.display = 'none';
            }
        } else {
            console.error('Element with id "AddLocationsTable" not found.');
        }



        const dataListAreasOfLocation = dataListAreas.find(itemAreas => itemAreas.idAreas === idAreas);
        document.getElementById('IDAreasOfLocations').value = dataListAreasOfLocation.idAreas;
        console.log('data id areas', idAreas);
    }

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
        console.log('dataLocationsToPost', dataLocationsToPost);
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


    //list location
    window.LocationsList = function (idAreas) {
        toggleFormVisibility(); // Toggle form visibility
        getLocationsAndDisplay(idAreas); // Fetch and display locations
    }

    async function toggleFormVisibility() {
        const table = document.getElementById('LocationsTable');
        if (table) {
            if (table.style.display === 'none') {
                table.style.display = 'table';
            } else {
                table.style.display = 'none';
            }
        } else {
            console.error('Element with id "LocationsTable" not found.');
        }
    }


    async function getLocationsAndDisplay(idAreas) {
        try {
            const response = await fetch(apiUrlGetLocation);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log('data all location', data);

            dataListLocations = data.filter(item => item.idAreas === idAreas).map(item => ({
                codeLocation: item.codeLocations,
                idLocation: item.idLocations,
                nameLocation: item.nameLocations,
                idAreas: item.idAreas
            }));

            displayLocations(dataListLocations);

            console.log('data of', idAreas, '', dataListLocations);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }

    function displayLocations(dataListLocations) {
        const tableBody = document.querySelector('#LocationsTable tbody');
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
                <button onclick="AddScene('${data.idLocation}')">ADD SCENE</button>
                <button onclick="SceneList('${data.idLocation}')">LIST SCENES OF LOCATION</button>
            </td>
        `;
            tableBody.appendChild(row);
        });
    }

    //edit locations
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

        console.log('data edit', dataEdit);
        console.log('data edit', dataEdit.idAreas);
    }

    document.getElementById('saveChangesLocationBtn').addEventListener('click', saveChangesLocation);
    function saveChangesLocation() {
        const editCodeLocations = document.getElementById('editCodeLocation').value;
        const editNameLocations = document.getElementById('editNameLocation').value;
        const editIDLocations = document.getElementById('editIDLocation').value;
        const editIDAreas = document.getElementById('editIDAreasLocation').value;


        const updateUrl = `/api/Locations/UpdateLocations`;

        const dataToUpdate = {
            CodeLocations: editCodeLocations,
            NameLocations: editNameLocations,
            IDLocations: editIDLocations,
            IDAreas: editIDAreas

        };
        console.log("data update", dataToUpdate);

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
    //delete location
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


    // thêm scene của location đó
    window.AddScene = function (idLocation) {
        openAddSceneModal(idLocation);
    }

    function openAddSceneModal(idLocation) {

        const table = document.getElementById('AddScenesTable');
        if (table) {
            if (table.style.display === 'none') {
                table.style.display = 'table';
            } else {
                table.style.display = 'none';
            }
        } else {
            console.error('Element with id "AddScenesTable" not found.');
        }



        const dataListSceneOfLocation = dataListLocations.find(itemLocations => itemLocations.idLocation === idLocation);
        document.getElementById('InputIDLocationOfScene').value = dataListSceneOfLocation.idLocation;
        console.log('data id location', idLocation);
    }

    // Thêm sự kiện nghe cho form khi nó được gửi
    document.getElementById('addScenesForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const url = window.location.origin + '/api/Scenes/InsertScenes';

        const idLocations = document.getElementById('InputIDLocationOfScene').value;
        const idScenes = document.getElementById('InputIDScene').value;
        const titleScenes = document.getElementById('InputTitleScene').value;
        const urlScenes = document.getElementById('InputURL').value;
        const pitchScenes = parseFloat(document.getElementById('InputPitch').value);
        const yawScenes = parseFloat(document.getElementById('InputYaw').value);

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
            getScenesAndDisplay(dataListScenes);

            // Clear textbox values

        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });


    //list scene
    window.SceneList = function (idLocation) {
        toggleFormVisibilityScenes(); // Toggle form visibility
        getScenesAndDisplay(idLocation); // Fetch and display locations
    }

    async function toggleFormVisibilityScenes() {
        const table = document.getElementById('ScenesTable');
        if (table) {
            if (table.style.display === 'none') {
                table.style.display = 'table';
            } else {
                table.style.display = 'none';
            }
        } else {
            console.error('Element with id "ScenesTable" not found.');
        }
    }


    async function getScenesAndDisplay(idLocation) {
        try {
            const response = await fetch(apiUrlGetScenes);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log('data all location', data);

            dataListScenes = data.filter(item => item.idLocations === idLocation).map(item => ({
                codeScenes: item.codeScenes,
                idLocations: item.idLocations,
                idScenes: item.idScenes,
                title: item.titleScenes,
                urlScenes: item.urlScenes,
                pitch: item.pitchScenes,
                yaw: item.yawScenes
            }));

            displayScenes(dataListScenes);

            console.log('data of',dataListScenes);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }

    function displayScenes(dataListScenes) {
        const tableBody = document.querySelector('#ScenesTable tbody');
        tableBody.innerHTML = '';

        dataListScenes.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${data.codeScenes}</td>
                <td>${data.idLocations}</td>
                <td>${data.idScenes}</td>
                <td>${data.title}</td>
                <td>${data.urlScenes}</td>
                <td>${data.pitch}</td>
                <td>${data.yaw}</td>
            <td>
                <button onclick="editScenesTable('${data.codeScenes}')">UPDATE</button>
                <button onclick="confirmDeleteScene('${data.codeScenes}')">DELETE</button>
                <button onclick="AddHotSpots('${data.idScenes}')">ADD HOTSPOT</button>
                <button onclick="HotSpotsList('${data.idScenes}')">LIST HOTSPOT OF SCENE</button>
            </td>
        `;
            tableBody.appendChild(row);
        });
    }
    //edit Scene
    window.editScenesTable = function (codeScenes) {
        openEditScenesModal(codeScenes);
        closeEditAreasModal();
        closeEditHotSpotsModal();
        closeEditLocationsModal();
    };
    function openEditScenesModal(codeScenes) {
        const editModal = document.getElementById('editScenesTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table';
        } else {
            editModal.style.display = 'none';
        }

        const dataEdit = dataListScenes.find(item => item.codeScenes === codeScenes);

        document.getElementById('editCodeScenes').value = dataEdit.codeScenes;
        document.getElementById('editIDLocations').value = dataEdit.idLocations;
        document.getElementById('editIDScenes').value = dataEdit.idScenes;
        document.getElementById('editTitle').value = dataEdit.title;
        document.getElementById('editLink').value = dataEdit.urlScenes;
        document.getElementById('editPitch').value = dataEdit.pitch;
        document.getElementById('editYaw').value = dataEdit.yaw;

        console.log('data edit', dataEdit);
        console.log('data edit', dataEdit.idLocations);
    }

    document.getElementById('saveChangesScenesBtn').addEventListener('click', saveChangesScenes);
    function saveChangesScenes() {
        const editedCodeScenes = document.getElementById('editCodeScenes').value;
        const editedIDLocations = document.getElementById('editIDLocations').value;
        const editedIDScenes = document.getElementById('editIDScenes').value;
        const editedTitle = document.getElementById('editTitle').value;
        const editedLink = document.getElementById('editLink').value;
        const editedPitch = parseFloat(document.getElementById('editPitch').value);
        const editedYaw = parseFloat(document.getElementById('editYaw').value);


        const updateUrl = `/api/Scenes/UpdateScenes`;

        const dataToUpdate = {
            codeScenes: editedCodeScenes,
            idLocations: editedIDLocations,
            idScenes: editedIDScenes,
            titleScenes: editedTitle,
            urlScenes: editedLink,
            pitchScenes: editedPitch,
            yawScenes: editedYaw

        };
        console.log("data update", dataToUpdate);

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
                    closeEditScenesModal();
                    getScenesAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('ERROR!');
                }
            })
            .catch(error => {
                console.error('SERVER IS NOT RESPONDING!', error);
            });
    }

    function closeEditScenesModal() {
        const editTable = document.getElementById('editScenesTable');
        editTable.style.display = 'none';
    }
    //delete scene
    window.confirmDeleteScene = function (codeScenes) {
        const shouldDelete = confirm('You want to delete this location?');
        if (shouldDelete) {
            console.log('Code Delete:', codeScenes);
            deleteScene(codeScenes);
        }
    };

    async function deleteScene(codeScenes) {
        console.log('code of delete location:', codeScenes);
        const deleteUrl = `/api/Scenes/DeleteScenes?codeScenes=${codeScenes}`;

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
            alert('DELETE SCENE ' + codeScenes + ' SUCCESS!');
            getScenesAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }

    // add hotspot
    window.AddHotSpots = function (idScenes) {
        openAddHotSpotModal(idScenes);
        const editTable = document.getElementById('editHotSpotsTable');
        editTable.style.display = 'none';
    }

    function openAddHotSpotModal(idScenes) {

        const table = document.getElementById('AddHotSpotTable');
        if (table) {
            if (table.style.display === 'none') {
                table.style.display = 'table';
            } else {
                table.style.display = 'none';
            }
        } else {
            console.error('Element with id "AddHotSpotTable" not found.');
        }



        const dataListHotSpotOfScenes = dataListScenes.find(itemidScenes => itemidScenes.idScenes === idScenes);
        document.getElementById('InputIDSceneOfHotSpot').value = dataListHotSpotOfScenes.idScenes;
        console.log('data id scene', idScenes);
    }

    document.getElementById('addHotSpotsForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const urlInsertHSP = window.location.origin + '/api/HotSpots/InsertHotSpot';

        const ScenesID = document.getElementById('InputIDSceneOfHotSpot').value;
        const IDNextScenes = document.getElementById('InputIDNextScene').value;
        const text = document.getElementById('InputTitleHotSpot').value;
        const pitch = parseFloat(document.getElementById('InputPitch').value);
        const yaw = parseFloat(document.getElementById('InputYaw').value);

        const dataToPost = {
            ScenesID: ScenesID,
            IDNextScenes: IDNextScenes,
            text: text,
            pitch: pitch,
            yaw: yaw
        };

        console.log('data post insert hotspot:', dataToPost);

        try {
            const response = await fetch(urlInsertHSP, {
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
            /*  getScenesAndDisplay();*/

            // Clear textbox values

        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });

    // list hotspot
    window.HotSpotsList = function (idScenes) {
        toggleFormVisibilityHotSpot(); // Toggle form visibility
        getHotSpotsAndDisplay(idScenes); // Fetch and display locations
    }

    async function toggleFormVisibilityHotSpot() {
        const table = document.getElementById('HotSpotsTable');
        if (table) {
            if (table.style.display === 'none') {
                table.style.display = 'table';
            } else {
                table.style.display = 'none';
            }
        } else {
            console.error('Element with id "HotSpotsTable" not found.');
        }
    }
    async function getHotSpotsAndDisplay(idScenes) {
        try {
            const response = await fetch(apiUrlGetHotSpots);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log('data all HotSpot', data);

            dataListHotSpots = data.filter(item => item.scenesID === idScenes).map(item => ({
                codeHotSpots: item.codeHotSpots,
                scenesID: item.scenesID,
                idNextScenes: item.idNextScenes,
                text: item.text,
                pitch: item.pitch,
                yaw: item.yaw
            }));

            displayHotSpots(dataListHotSpots);

            console.log('data of', idScenes, '', dataListHotSpots);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }

    function displayHotSpots(dataListHotSpots) {
        const tableBody = document.querySelector('#HotSpotsTable tbody');
        tableBody.innerHTML = '';

        // Kiểm tra xem dataListHotSpots có phải là một mảng không
        if (Array.isArray(dataListHotSpots) && dataListHotSpots.length > 0) {
            const hotSpot = dataListHotSpots[0]; // Lấy đối tượng từ mảng

            // Hiển thị thông tin từ đối tượng trong bảng
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${hotSpot.codeHotSpots}</td>
            <td>${hotSpot.scenesID}</td>
            <td>${hotSpot.idNextScenes}</td>
            <td>${hotSpot.text}</td>
            <td>${hotSpot.pitch}</td>
            <td>${hotSpot.yaw}</td>
            <td>
                <button onclick="editHotSpots('${hotSpot.codeHotSpots}')">UPDATE</button>
                <button onclick="confirmDeleteHotSpots('${hotSpot.codeHotSpots}')">DELETE</button>
            </td>
        `;
            tableBody.appendChild(row);
        } else {
            console.error('dataListHotSpots is not a valid array or is empty.');
        }
    }



    //edit hotspot
    window.editHotSpots = function (codeHotSpots) {
        openEditHotSpotsModal(codeHotSpots);
        closeEditAreasModal();
        closeEditLocationsModal();
        closeEditScenesModal();
    };
    function openEditHotSpotsModal(codeHotSpots) {
        const editModal = document.getElementById('editHotSpotsTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table';
        } else {
            editModal.style.display = 'none';
        }

        const dataEdit = dataListHotSpots.find(item => item.codeHotSpots === codeHotSpots);

        document.getElementById('editCodeHotSpots').value = dataEdit.codeHotSpots;
        document.getElementById('editScenesID').value = dataEdit.scenesID;
        document.getElementById('editIDNextScenes').value = dataEdit.idNextScenes;
        document.getElementById('editText').value = dataEdit.text;
        document.getElementById('editPitchHSP').value = dataEdit.pitch;
        document.getElementById('editYawHSP').value = dataEdit.yaw;

        console.log('data edit', dataEdit);
        console.log('data edit', dataEdit.codeHotSpots);
    }

    document.getElementById('saveChangesHotSpot').addEventListener('click', saveChangesHotSpots);
    function saveChangesHotSpots() {
        const editedCodeHotSpots = document.getElementById('editCodeHotSpots').value;
        const editedScenesID = document.getElementById('editScenesID').value;
        const editedIDNextScene = document.getElementById('editIDNextScenes').value;
        const editedText = document.getElementById('editText').value;
        const editedPitch = parseFloat(document.getElementById('editPitchHSP').value);
        const editedYaw = parseFloat(document.getElementById('editYawHSP').value);


        const updateUrl = `/api/HotSpots/UpdateHotSpot`;

        const dataToUpdate = {
            codeHotSpots: editedCodeHotSpots,
            scenesID: editedScenesID,
            idNextScenes: editedIDNextScene,
            text: editedText,
            pitch: editedPitch,
            yaw: editedYaw
        };
        console.log("data update", dataToUpdate);

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
                    closeEditHotSpotsModal();
                    getHotSpotsAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('ERROR!');
                }
            })
            .catch(error => {
                console.error('SERVER IS NOT RESPONDING!', error);
            });

    }



    function closeEditHotSpotsModal() {
        const editTable = document.getElementById('editHotSpotsTable');
        editTable.style.display = 'none';
    }
    //delete hotspot
    window.confirmDeleteHotSpots = function (codeHotSpots) {
        const shouldDelete = confirm('You want to delete this hotspot?');
        if (shouldDelete) {
            console.log('Code Delete:', codeHotSpots);
            deleteHotSpot(codeHotSpots);
        }
    };

    async function deleteHotSpot(codeHotSpots) {
        console.log('code of delete location:', codeHotSpots);
        const deleteUrl = `/api/HotSpots/DeleteHotSpots?codeHotSpots=${codeHotSpots}`;

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
            alert('DELETE HOTSPOT ' + codeHotSpots + ' SUCCESS!');
            getHotSpotsAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }
});

