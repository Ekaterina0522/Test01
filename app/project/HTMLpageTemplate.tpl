<!DOCTYPE html>
<html>

<head>
    <title>Задача 2</title>
</head>

<body>
    <table border="1" cellspacing="0" cellpadding="2">
        <thead>
            <tr align="center">
                <th>Sequence</th>
                <th>Scene</th>
                <th>Duration</th>
                <th>Frames</th>
                <th>Folder</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            {{#each items}}
            <tr align="center">
                <td>{{sequence}}</td>
                <td>{{scene}}</td>
                <td>{{duration}}</td>
                <td>{{frames}}</td>
                <td>{{folder}}</td>
                <td>{{image}}</td>
            </tr>
            {{/each}}
        </tbody>
    </table>
</body>

</html>