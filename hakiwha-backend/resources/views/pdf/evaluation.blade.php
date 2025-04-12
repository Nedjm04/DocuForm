<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Fiche d'évaluation - {{ $formation->titre }}</title>
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
        .stagiaire-info {
            margin-bottom: 20px;
        }
        .questions {
            margin: 20px 0;
        }
        .question {
            margin-bottom: 20px;
        }
        .question-text {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .options {
            margin-left: 20px;
        }
        .option {
            margin-bottom: 5px;
        }
        .comment {
            margin-top: 20px;
        }
        .comment textarea {
            width: 100%;
            height: 100px;
            margin-top: 10px;
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
        <h1>Fiche d'évaluation à chaud</h1>
    </div>

    <div class="formation-info">
        <p><strong>Formation:</strong> {{ $formation->titre }}</p>
        <p><strong>Date:</strong> {{ now()->format('d/m/Y') }}</p>
        <p><strong>Formateur:</strong> {{ $formation->formateur_nom }}</p>
    </div>

    <div class="stagiaire-info">
        <p><strong>Nom:</strong> {{ $stagiaire->nom }}</p>
        <p><strong>Prénom:</strong> {{ $stagiaire->prenom }}</p>
    </div>

    <div class="questions">
        <div class="question">
            <div class="question-text">1. Comment évaluez-vous la qualité du contenu de la formation ?</div>
            <div class="options">
                <div class="option">□ Très satisfaisant</div>
                <div class="option">□ Satisfaisant</div>
                <div class="option">□ Moyen</div>
                <div class="option">□ Peu satisfaisant</div>
                <div class="option">□ Pas du tout satisfaisant</div>
            </div>
        </div>

        <div class="question">
            <div class="question-text">2. Comment évaluez-vous la pédagogie du formateur ?</div>
            <div class="options">
                <div class="option">□ Très satisfaisant</div>
                <div class="option">□ Satisfaisant</div>
                <div class="option">□ Moyen</div>
                <div class="option">□ Peu satisfaisant</div>
                <div class="option">□ Pas du tout satisfaisant</div>
            </div>
        </div>

        <div class="question">
            <div class="question-text">3. Les objectifs de la formation ont-ils été atteints ?</div>
            <div class="options">
                <div class="option">□ Totalement</div>
                <div class="option">□ En grande partie</div>
                <div class="option">□ Partiellement</div>
                <div class="option">□ Peu</div>
                <div class="option">□ Pas du tout</div>
            </div>
        </div>

        <div class="comment">
            <div class="question-text">4. Commentaires et suggestions d'amélioration :</div>
            <textarea></textarea>
        </div>
    </div>

    <div class="signature">
        <p>Signature du stagiaire :</p>
        <div class="signature-line"></div>
    </div>
</body>
</html> 