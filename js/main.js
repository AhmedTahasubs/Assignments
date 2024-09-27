var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var submitButton = document.getElementById("submitButton");
var bookmarkList=[];
var URLRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
var URLNameRegex = /^\w{3,}(\s+\w+)*$/;

if(localStorage.getItem("ourBookmarks") !== null)
    {
        bookmarkList= JSON.parse(localStorage.getItem("ourBookmarks"));
        displayBookmarks(bookmarkList);
    }

function addBookmark()
{
    if(isValidInput(URLNameRegex,siteNameInput) & isValidInput(URLRegex,siteURLInput))
    {
        var bookmark =
        {
            bookmarkName:siteNameInput.value,
            bookmarkURL: siteURLInput.value
        }
        bookmark.bookmarkName=bookmark.bookmarkName.substring(0, 1).toUpperCase() + bookmark.bookmarkName.substring(1);
        bookmarkList.push(bookmark);
        localStorage.setItem("ourBookmarks",JSON.stringify(bookmarkList));
        displayBookmarks(bookmarkList);
        resetInputs();
    }
    else
    {
        alert("Enter a Valid Bookmark Name that must contain at least 3 characters, And a Valid Website URL")
    }
}

function displayBookmarks(arr)
{
    var bookmarkContainer=``
    for(var i=0; i<arr.length;i++)
    {
        bookmarkContainer +=`
                            <tr>
                                <td>${i+1}</td>
                                <td>${arr[i].bookmarkName}</td>
                                <td><a target="_blank" rel="noreferrer noopener" href="https://${arr[i].bookmarkURL}" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
                                <td><button onclick="deleteBookmark(${i})" class="button-focus btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                            </tr>`
    }
    tableContent.innerHTML= bookmarkContainer;
}
function resetInputs()
{
    siteNameInput.value=null;
    siteURLInput.value=null;
    siteNameInput.classList.remove("is-valid","is-invalid")
    siteURLInput.classList.remove("is-valid","is-invalid")
}

function deleteBookmark(deletedIndex)
{
    bookmarkList.splice(deletedIndex,1);
    localStorage.setItem("ourBookmarks",JSON.stringify(bookmarkList));
    displayBookmarks(bookmarkList);
}

function isValidInput(regex,element)
{
    if(regex.test(element.value)==true)
    {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}