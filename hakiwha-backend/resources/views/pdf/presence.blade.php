<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Fiche de présence - {{ $formation->titre }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .formation-info {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .signature {
            margin-top: 50px;
            width: 100%;
        }
        .signature-line {
            border-top: 1px solid #000;
            width: 200px;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Fiche de présence</h1>
    </div>

    <div class="formation-info">
        <p><strong>Formation:</strong> {{ $formation->titre }}</p>
        <p><strong>Groupe:</strong> {{ $group->nom }}</p>
        <p><strong>Date:</strong> {{ now()->format('d/m/Y') }}</p>
        <p><strong>Formateur:</strong> {{ $formation->formateur_nom }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Signature</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stagiaires as $stagiaire)
            <tr>
                <td>{{ $stagiaire->nom }}</td>
                <td>{{ $stagiaire->prenom }}</td>
                <td class="signature">
                    <div class="signature-line"></div>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html> 