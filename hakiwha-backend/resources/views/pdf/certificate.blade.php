<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificat de formation - {{ $formation->titre }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-image: url('{{ public_path('images/certificate-bg.png') }}');
            background-size: cover;
            background-position: center;
            min-height: 100vh;
        }
        .certificate {
            text-align: center;
            padding: 50px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .content {
            margin: 40px 0;
        }
        .name {
            font-size: 20px;
            font-weight: bold;
            margin: 20px 0;
        }
        .formation {
            margin: 20px 0;
        }
        .dates {
            margin: 20px 0;
        }
        .qr-code {
            margin-top: 30px;
        }
        .footer {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .signature {
            text-align: center;
        }
        .signature-line {
            border-top: 1px solid #000;
            width: 200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="title">CERTIFICAT DE FORMATION</div>
        
        <div class="content">
            <p>Le présent certificat atteste que</p>
            
            <div class="name">
                {{ $stagiaire->prenom }} {{ $stagiaire->nom }}
            </div>
            
            <p>a suivi avec succès la formation</p>
            
            <div class="formation">
                <strong>{{ $formation->titre }}</strong>
            </div>
            
            <div class="dates">
                du {{ $formation->date_debut->format('d/m/Y') }} au {{ $formation->date_fin->format('d/m/Y') }}
            </div>
            
            <p>pour une durée totale de {{ $formation->duree }} heures</p>
        </div>
        
        <div class="footer">
            <div class="signature">
                <p>Le formateur</p>
                <div class="signature-line"></div>
                <p>{{ $formation->formateur_nom }}</p>
            </div>
            
            <div class="signature">
                <p>Le directeur</p>
                <div class="signature-line"></div>
                <p>Signature</p>
            </div>
        </div>
        
        <div class="qr-code">
            {!! $qrCode !!}
            <p>ID: {{ $certificate->uuid }}</p>
        </div>
    </div>
</body>
</html> 