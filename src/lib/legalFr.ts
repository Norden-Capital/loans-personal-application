import type { Section } from "@/lib/legal";

/**
 * The French Terms and Privacy Policy. Same sections, same order and the same
 * {tokens} as the English in legal.ts. When the English changes, change this too.
 */

export const TERMS_FR: Section[] = [
  {
    title: "1. À propos de ces conditions",
    blocks: [
      { p: "Les présentes conditions générales régissent votre utilisation de {site} et des services de recommandation offerts par son intermédiaire." },
      {
        p: "Le site est exploité sous la marque {brand} et appartient à {company}, faisant affaire sous le nom de Norden Capital (« nous », « notre » ou « nos »), qui l'exploite.",
      },
      {
        p: "Veuillez lire ces conditions avant de soumettre une demande. Lorsque nous vous demandons de les accepter, vous pouvez refuser en ne poursuivant pas l'envoi.",
      },
    ],
  },
  {
    title: "2. Notre rôle",
    blocks: [
      {
        p: "Norden Capital offre des services de recommandation de prêts et de génération de demandes qui aident à mettre les consommateurs en relation avec des prêteurs et des partenaires de recommandation participants.",
      },
      {
        p: "Nous ne sommes pas un prêteur. Nous n'accordons pas de prêts, ne prenons pas de décisions de crédit, ne fixons pas les conditions des prêts, ne percevons pas de remboursements et ne garantissons pas l'approbation.",
      },
      {
        p: "Soumettre une demande sur notre site est une demande de mise en relation avec des fournisseurs participants. Ce n'est ni un contrat de prêt, ni une offre de crédit, ni un engagement à prêter.",
      },
      { p: "Tout prêt que vous obtenez est régi par un contrat distinct entre vous et le prêteur." },
    ],
  },
  {
    title: "3. Admissibilité",
    blocks: [
      { p: "Pour soumettre une demande, vous devez :" },
      {
        list: [
          "Résider au Canada.",
          "Avoir atteint l'âge de la majorité dans votre province ou territoire.",
          "Soumettre la demande en votre propre nom.",
          "Fournir des renseignements exacts et à jour.",
          "Avoir la capacité juridique d'accepter ces conditions.",
        ],
      },
      {
        p: "D'autres critères d'admissibilité peuvent s'appliquer selon le fournisseur, le produit et la province ou le territoire. Nos services et les fournisseurs participants peuvent ne pas être offerts partout.",
      },
    ],
  },
  {
    title: "4. Renseignements que vous fournissez",
    blocks: [
      { p: "Vous acceptez de fournir des renseignements exacts, complets et véridiques, au meilleur de votre connaissance." },
      {
        p: "Vous ne devez pas soumettre les renseignements d'une autre personne sans autorisation légale, vous faire passer pour quelqu'un d'autre ni soumettre de demandes frauduleuses.",
      },
      {
        p: "Si vous découvrez une erreur importante après avoir soumis votre demande, communiquez avec nous rapidement. Si vos renseignements ont déjà été transmis à un fournisseur, vous devrez peut-être aussi communiquer directement avec ce fournisseur.",
      },
      {
        p: "Nous pouvons refuser de traiter les demandes qui semblent frauduleuses, incomplètes ou contraires à ces conditions, sous réserve de la loi applicable.",
      },
    ],
  },
  {
    title: "5. Fonctionnement du service de recommandation",
    blocks: [
      {
        p: "Lorsque vous soumettez une demande et donnez le consentement requis, nous pouvons transmettre vos renseignements à des prêteurs ou à des partenaires de recommandation participants afin de trouver des options de prêt possibles.",
      },
      {
        p: "Les partenaires de recommandation peuvent travailler avec leurs propres réseaux de prêteurs, comme l'expliquent les avis présentés lorsque vous soumettez votre demande.",
      },
      {
        p: "Un fournisseur peut communiquer avec vous, vous demander d'autres renseignements ou vous inviter à remplir une demande sur son propre site.",
      },
      { p: "Soumettre une demande ne vous oblige pas à accepter une offre ni à conclure un contrat de prêt." },
      {
        p: "Notre réseau ne comprend pas nécessairement tous les prêteurs ou produits financiers offerts au Canada. Une recommandation n'est pas une comparaison complète du marché ni une promesse qu'un fournisseur offre le taux le plus bas ou le produit le plus adapté.",
      },
    ],
  },
  {
    title: "6. Approbation, taux et versement des fonds",
    blocks: [
      { p: "Les prêteurs décident de façon indépendante :" },
      {
        list: [
          "S'ils approuvent une demande.",
          "Du montant offert.",
          "Des taux d'intérêt et des frais applicables.",
          "Des calendriers de remboursement et des autres conditions.",
          "Des vérifications requises et des modes de versement.",
        ],
      },
      {
        p: "Les montants, taux, délais de traitement ou exemples de versement affichés sur notre site sont soumis aux précisions présentées avec eux.",
      },
      {
        p: "L'approbation et le versement des fonds ne sont pas garantis. Les délais peuvent dépendre du prêteur, des vérifications, des heures d'ouverture des banques, de votre institution financière et d'autres facteurs.",
      },
      {
        p: "Avant d'accepter une offre, lisez les informations fournies par le prêteur, notamment le taux annuel en pourcentage s'il y a lieu, le coût total de l'emprunt, le calendrier des paiements et les conséquences d'un paiement manqué.",
      },
    ],
  },
  {
    title: "7. Frais et rémunération",
    blocks: [
      {
        p: "Nous pouvons être rémunérés par des prêteurs ou des partenaires de recommandation participants pour des recommandations, des demandes soumises ou d'autres résultats admissibles.",
      },
      {
        p: "Les intérêts, frais ou obligations de remboursement liés à un prêt doivent être indiqués par le prêteur dans son propre contrat. Ces conditions ne nous autorisent pas à prélever de l'argent sur votre compte bancaire ni à percevoir les paiements d'un prêt.",
      },
    ],
  },
  {
    title: "8. Vérifications et vérification de crédit",
    blocks: [
      {
        p: "Un fournisseur peut exiger une vérification de votre identité, de vos revenus, de votre emploi, de vos renseignements bancaires ou de votre crédit avant de décider de vous offrir un prêt.",
      },
      {
        p: "Toute vérification de crédit ou tout accès à des renseignements financiers sensibles doit s'appuyer sur les avis et l'autorisation exigés par la loi applicable.",
      },
      {
        p: "Accepter ces conditions ne nous donne pas, à lui seul, une permission illimitée d'obtenir votre dossier de crédit ou d'accéder à votre compte bancaire.",
      },
    ],
  },
  {
    title: "9. Vie privée et communications",
    blocks: [
      {
        p: "La façon dont nous recueillons, utilisons et communiquons les renseignements personnels est expliquée dans notre {privacyLink} et dans les avis présentés lorsque vous soumettez votre demande.",
      },
      {
        p: "Nous et les fournisseurs qui reçoivent votre demande pouvons communiquer avec vous à son sujet, conformément à votre consentement et à la loi applicable.",
      },
      {
        p: "Les courriels et textos promotionnels facultatifs sont régis par les choix de consentement distincts qui vous sont présentés. Accepter ces conditions ne vous inscrit pas automatiquement à du marketing sans lien avec votre demande.",
      },
      {
        p: "Vous pouvez vous désabonner de nos communications promotionnelles en suivant les instructions dans les messages ou en communiquant avec nous. Les fournisseurs indépendants gèrent leurs propres préférences de communication et demandes de désabonnement.",
      },
    ],
  },
  {
    title: "10. Documents électroniques",
    blocks: [
      {
        p: "Lorsque vous acceptez ces conditions par voie électronique, nous pouvons conserver une preuve de votre acceptation, de la version présentée et de la demande liée.",
      },
      { p: "L'acceptation électronique de ces conditions du site ne vaut pas acceptation du contrat de prêt d'un prêteur." },
      { p: "Vous pouvez enregistrer ou imprimer une copie de ces conditions pour vos dossiers." },
    ],
  },
  {
    title: "11. Utilisation acceptable",
    blocks: [
      { p: "Vous ne devez pas :" },
      {
        list: [
          "Utiliser le site pour de la fraude, de l'usurpation d'identité ou toute autre activité illégale.",
          "Soumettre des demandes inventées ou des renseignements que vous n'êtes pas autorisé à fournir.",
          "Tenter d'accéder à des renseignements ou à des systèmes sans permission.",
          "Introduire des logiciels malveillants, nuire à la sécurité du site ou perturber son fonctionnement.",
          "Recueillir les renseignements personnels d'autres utilisateurs.",
          "Utiliser des outils automatisés d'une manière qui compromet la sécurité, surcharge le site ou porte atteinte aux droits d'autrui.",
        ],
      },
      {
        p: "Nous pouvons restreindre l'accès lorsque c'est raisonnablement nécessaire pour faire face à un usage abusif, protéger les utilisateurs, maintenir la sécurité ou respecter la loi.",
      },
    ],
  },
  {
    title: "12. Contenu du site et propriété intellectuelle",
    blocks: [
      { p: "Le contenu, l'image de marque, les éléments graphiques et les logiciels du site nous appartiennent ou sont utilisés avec permission." },
      {
        p: "Vous pouvez consulter le site et enregistrer les renseignements utiles pour votre usage personnel et légal. Toute autre reproduction, distribution ou utilisation commerciale exige une permission, sauf si la loi le permet.",
      },
      { p: "Rien dans ces conditions ne limite les avis de consommateurs, les plaintes ou toute autre expression protégée par la loi." },
    ],
  },
  {
    title: "13. Fournisseurs et sites tiers",
    blocks: [
      { p: "Notre site peut contenir des liens vers des fournisseurs indépendants et des sites tiers." },
      {
        p: "Ces fournisseurs sont responsables de leurs propres services, décisions, contrats et pratiques en matière de vie privée. Lisez leurs conditions avant de fournir d'autres renseignements ou d'accepter une offre.",
      },
      { p: "Nous demeurons responsables de notre propre conduite et de nos obligations en vertu de la loi applicable." },
    ],
  },
  {
    title: "14. Disponibilité et information du site",
    blocks: [
      {
        p: "Nous prenons des mesures raisonnables pour que le site fonctionne et que ses informations soient exactes. Toutefois, des interruptions, des erreurs techniques, des informations périmées et des changements de service peuvent survenir.",
      },
      { p: "Nous pouvons suspendre temporairement certaines parties du site pour des raisons d'entretien, de sécurité ou d'exploitation." },
      {
        p: "Le contenu du site donne des informations générales sur notre service de recommandation. Il ne constitue pas un conseil financier, juridique ou fiscal personnalisé.",
      },
      { p: "Rien dans cette section n'exclut une garantie, une obligation ou un recours qui ne peut légalement être exclu." },
    ],
  },
  {
    title: "15. Responsabilité et droits des consommateurs",
    blocks: [
      { p: "La responsabilité de chaque partie est déterminée par la loi applicable." },
      {
        p: "Nous ne promettons pas qu'une recommandation mènera à une offre, à une approbation, à un taux précis ou à un versement dans un délai donné.",
      },
      {
        p: "Rien dans ces conditions n'exclut une responsabilité qui ne peut légalement être exclue ni ne limite les protections obligatoires des consommateurs. Cela comprend les droits liés aux représentations trompeuses, à la vie privée ou à toute autre obligation qui s'applique à nos services.",
      },
    ],
  },
  {
    title: "16. Questions et plaintes",
    blocks: [
      {
        p: "Communiquez avec nous si vous avez une préoccupation au sujet de notre site ou de notre service de recommandation. Donnez assez de détails pour que nous puissions enquêter, mais n'envoyez pas de mots de passe ni d'identifiants bancaires en ligne.",
      },
      {
        p: "Les questions sur la décision d'approbation d'un prêteur, les conditions du prêt, le versement des fonds ou les remboursements doivent aussi être adressées à ce prêteur.",
      },
      {
        p: "Communiquer avec nous ne vous empêche pas de vous adresser à un organisme de réglementation, d'obtenir un avis juridique ou d'exercer tout recours prévu par la loi applicable.",
      },
    ],
  },
  {
    title: "17. Droit applicable",
    blocks: [
      {
        p: "Ces conditions sont régies par les lois de {province} et par les lois fédérales du Canada qui s'y appliquent, sous réserve des lois impératives du lieu où vous résidez.",
      },
      {
        p: "Rien dans ces conditions ne retire les protections prévues par les lois provinciales ou territoriales sur la protection du consommateur ni ne vous oblige à intenter une poursuite dans un lieu contraire à ces lois.",
      },
      {
        p: "Ces conditions n'imposent pas d'arbitrage obligatoire et ne vous font pas renoncer au droit de participer à une action collective lorsque ce droit est protégé par la loi.",
      },
    ],
  },
  {
    title: "18. Modifications de ces conditions",
    blocks: [
      { p: "Nous pouvons modifier ces conditions pour tenir compte de changements à nos services ou à nos obligations légales." },
      {
        p: "La version à jour sera publiée avec une nouvelle date. Lorsque la loi l'exige, nous vous en aviserons et obtiendrons votre acceptation avant que les changements s'appliquent.",
      },
      { p: "Les changements ne retireront pas rétroactivement les droits liés à une demande antérieure." },
    ],
  },
  {
    title: "19. Divisibilité",
    blocks: [
      {
        p: "Si une disposition est jugée invalide ou inapplicable, elle ne s'appliquera que dans la mesure permise par la loi. Les autres dispositions continueront de s'appliquer lorsque c'est légalement possible.",
      },
    ],
  },
  {
    title: "20. Coordonnées",
    blocks: [
      {
        lines: [
          "Norden Capital",
          "Exploité par : {company}",
          "Marque du site : {brand}",
          "Site Web : {site}",
          "Courriel : {supportEmail}",
          "Adresse postale : {address}",
        ],
      },
    ],
  },
];

export const PRIVACY_FR: Section[] = [
  {
    title: "1. Qui nous sommes",
    blocks: [
      { p: "{brand} est exploité par {company}, faisant affaire sous le nom de Norden Capital (« nous », « notre » ou « nos »)." },
      {
        p: "Nous respectons votre vie privée. Cette politique explique comment nous recueillons, utilisons, communiquons et protégeons vos renseignements personnels lorsque vous visitez {site}, soumettez une demande ou communiquez avec nous.",
      },
      {
        p: "Norden Capital offre des services de recommandation de prêts et de génération de demandes. Nous ne sommes pas un prêteur, n'accordons pas de prêts et ne prenons pas de décisions de prêt. Les prêteurs participants décident de l'admissibilité, de l'approbation, des taux, des conditions de remboursement et du versement des fonds.",
      },
      {
        p: "Cette politique porte sur la façon dont nous traitons vos renseignements. Les prêteurs et les autres partenaires indépendants ont leurs propres politiques de confidentialité.",
      },
    ],
  },
  {
    title: "2. Renseignements que nous recueillons",
    blocks: [
      { p: "Selon la façon dont vous utilisez notre site, nous pouvons recueillir :" },
      {
        list: [
          "Coordonnées et renseignements d'identification : votre nom, votre adresse courriel, votre numéro de téléphone, votre date de naissance et votre adresse résidentielle.",
          "Renseignements sur votre demande : le montant que vous souhaitez emprunter et les renseignements que vous fournissez sur votre emploi, vos revenus et votre situation financière.",
          "Historique des communications : messages, demandes d'aide, préférences et preuves de votre consentement ou du retrait de votre consentement.",
          "Renseignements techniques : votre adresse IP, le type de navigateur, des informations sur l'appareil, les pages consultées, la source de la visite et vos interactions avec notre site.",
        ],
      },
      {
        p: "Les renseignements demandés dépendent du formulaire ou du service que vous utilisez. Nous indiquons les champs obligatoires lorsque nous recueillons vos renseignements.",
      },
      {
        p: "Si vous suivez un lien vers le site d'un prêteur, les renseignements que vous fournissez directement à ce prêteur sont régis par sa politique de confidentialité.",
      },
    ],
  },
  {
    title: "3. Comment nous utilisons vos renseignements",
    blocks: [
      { p: "Nous utilisons les renseignements personnels aux fins expliquées au moment de leur collecte, notamment pour :" },
      {
        list: [
          "Recevoir et traiter votre demande de recommandation.",
          "Jumeler votre demande et la transmettre à des prêteurs ou à des partenaires de recommandation participants.",
          "Communiquer avec vous au sujet de votre demande et répondre à vos questions.",
          "Exploiter, maintenir et dépanner notre site.",
          "Détecter la fraude, les usages abusifs et les incidents de sécurité.",
          "Conserver la preuve des consentements et des préférences de communication.",
          "Respecter nos obligations légales et régler les différends.",
          "Envoyer des communications promotionnelles lorsque nous avons le consentement ou l'autorisation légale requise.",
        ],
      },
      { p: "Nous ne garantissons pas que soumettre une demande mènera à un jumelage, à une approbation ou à un versement." },
    ],
  },
  {
    title: "4. Comment nous communiquons vos renseignements",
    blocks: [
      { h: "Prêteurs et partenaires de recommandation" },
      {
        p: "Lorsque vous nous demandez de vous mettre en relation avec des options de prêt et donnez le consentement requis, nous communiquons les renseignements nécessaires au traitement de votre demande à des prêteurs ou à des partenaires de recommandation participants.",
      },
      {
        p: "Un partenaire de recommandation peut transmettre votre demande à des prêteurs de son réseau, comme l'expliquent les avis fournis lorsque vous soumettez votre demande.",
      },
      {
        p: "Ces destinataires peuvent utiliser vos renseignements pour évaluer votre demande et communiquer avec vous au sujet des services offerts, sous réserve de votre consentement et de la loi applicable. Toute demande, vérification, évaluation de crédit ou tout contrat de prêt qui suit relève des conditions et de la politique de confidentialité du fournisseur concerné.",
      },
      { h: "Fournisseurs de services" },
      {
        p: "Nous pouvons faire appel à des fournisseurs de services pour l'hébergement du site, le stockage des données, le service à la clientèle, l'analyse, la sécurité et l'envoi de courriels ou de textos.",
      },
      {
        p: "Ces fournisseurs peuvent accéder aux renseignements personnels dans la mesure nécessaire aux services qu'ils nous rendent. Nous exigeons des protections adéquates de la vie privée et de la sécurité pour les renseignements traités en notre nom.",
      },
      { h: "Fins juridiques et commerciales" },
      {
        p: "Nous pouvons communiquer des renseignements lorsque la loi l'exige ou le permet, notamment en réponse à une demande légale valide ou pour nous protéger contre la fraude et les activités illégales.",
      },
      {
        p: "En cas de fusion, d'acquisition ou de vente de notre entreprise, des renseignements personnels peuvent être communiqués ou transférés comme le permet la loi et sous réserve des exigences de confidentialité applicables.",
      },
      { p: "Nous n'autorisons pas d'utilisations de vos renseignements sans lien avec votre demande du seul fait que vous visitez notre site." },
    ],
  },
  {
    title: "5. Consentement et vos choix",
    blocks: [
      {
        p: "Nous expliquons les fins de la collecte, de l'utilisation et de la communication de vos renseignements lorsque nous demandons votre consentement. Lorsque la loi l'exige, nous obtenons un consentement exprès, notamment pour les renseignements sensibles ou les activités de marketing facultatives.",
      },
      {
        p: "Prendre connaissance de cette politique de confidentialité ne constitue pas, à lui seul, un consentement à toutes les utilisations possibles de vos renseignements.",
      },
      {
        p: "Vous pouvez refuser les utilisations facultatives ou retirer votre consentement en communiquant avec nous. Le retrait du consentement n'invalide pas le traitement effectué légalement avant ce retrait.",
      },
      {
        p: "Si vous refusez ou retirez un consentement nécessaire au traitement d'une recommandation, nous pourrions ne pas pouvoir donner suite à votre demande. Nous vous expliquerons les conséquences, s'il y a lieu.",
      },
    ],
  },
  {
    title: "6. Courriels, textos et appels téléphoniques",
    blocks: [
      { h: "Communications au sujet de votre demande" },
      {
        p: "Nous ou les partenaires qui reçoivent votre demande pouvons communiquer avec vous pour répondre à votre demande, expliquer les prochaines étapes ou discuter d'options de prêt pertinentes, conformément au consentement que vous avez donné et à la loi applicable.",
      },
      { h: "Communications promotionnelles" },
      {
        p: "Lorsque nous y sommes autorisés, nous pouvons envoyer des courriels ou des textos promotionnels au sujet de nos services ou des offres de nos partenaires participants.",
      },
      {
        p: "Vous pouvez vous désabonner de nos courriels promotionnels à l'aide du lien de désabonnement dans le message. Pour les textos promotionnels, suivez les instructions de désabonnement fournies, par exemple en répondant ARRET ou STOP lorsque c'est possible. Vous pouvez aussi communiquer avec nous à l'aide des coordonnées ci-dessous.",
      },
      { p: "Refuser les communications de marketing facultatives ne vous empêche pas de soumettre une demande de recommandation." },
      {
        p: "Si vous recevez des communications directement d'un partenaire indépendant, suivez ses instructions de désabonnement ou communiquez directement avec lui pour gérer ses communications.",
      },
    ],
  },
  {
    title: "7. Témoins et technologies semblables",
    blocks: [
      {
        p: "Notre site peut utiliser des témoins (cookies) et des technologies semblables pour assurer son fonctionnement, retenir vos préférences, mesurer l'achalandage et comprendre comment les visiteurs utilisent nos services.",
      },
      {
        p: "Lorsqu'elles sont activées et permises, des technologies publicitaires peuvent aussi aider à mesurer la performance des campagnes ou à personnaliser la publicité.",
      },
      {
        p: "Lorsque la loi l'exige, nous demandons votre consentement avant d'activer les technologies facultatives. Vous pouvez gérer les préférences offertes dans les paramètres de votre navigateur.",
      },
      { p: "Désactiver certains témoins peut nuire au fonctionnement du site." },
    ],
  },
  {
    title: "8. Sécurité des renseignements",
    blocks: [
      {
        p: "Nous utilisons des mesures de protection administratives, techniques et physiques adaptées à la sensibilité des renseignements que nous traitons. L'accès est limité aux personnes et aux fournisseurs de services qui en ont besoin à des fins autorisées.",
      },
      {
        p: "Aucune méthode de transmission par Internet ou de stockage électronique n'est entièrement sûre. Nous ne pouvons pas garantir une sécurité absolue.",
      },
    ],
  },
  {
    title: "9. Lieux de stockage et de traitement",
    blocks: [
      {
        p: "Vos renseignements personnels peuvent être conservés ou traités {locations}, y compris dans les lieux où nous ou nos fournisseurs de services exerçons nos activités.",
      },
      {
        p: "Lorsque des renseignements sont traités à l'extérieur de votre province ou du Canada, ils peuvent être soumis aux lois de cet endroit, y compris à l'accès légal par les autorités locales.",
      },
      {
        p: "S'il y a lieu, nous évaluons les transferts et appliquons les mesures contractuelles et autres exigées par la loi, y compris les exigences relatives aux renseignements communiqués à l'extérieur du Québec.",
      },
    ],
  },
  {
    title: "10. Durée de conservation",
    blocks: [
      {
        p: "Nous conservons les renseignements personnels seulement le temps nécessaire pour réaliser les fins pour lesquelles ils ont été recueillis et pour respecter les exigences légales, de tenue de dossiers, de sécurité et de règlement des différends.",
      },
      {
        p: "La durée de conservation dépend du type de renseignement et de la raison pour laquelle il est conservé. Lorsqu'un renseignement n'est plus nécessaire, nous le détruisons de façon sécuritaire ou l'anonymisons conformément à la loi applicable.",
      },
      {
        p: "Nous pouvons conserver une liste limitée d'exclusion afin de respecter les demandes de désabonnement et d'éviter tout autre marketing non désiré.",
      },
    ],
  },
  {
    title: "11. Vos droits en matière de vie privée",
    blocks: [
      { p: "Sous réserve de la loi applicable et des exceptions permises, vous pouvez demander :" },
      {
        list: [
          "L'accès aux renseignements personnels que nous détenons à votre sujet.",
          "La correction de renseignements inexacts ou incomplets.",
          "Le retrait de votre consentement à certaines utilisations ou communications.",
          "La suppression des renseignements que nous n'avons plus de raison légale de conserver.",
          "Des informations sur la façon dont nous traitons et communiquons vos données.",
          "Une copie électronique des renseignements visés, dans un format structuré et couramment utilisé, lorsque la loi l'exige.",
          "Le dépôt d'une plainte relative à la vie privée.",
        ],
      },
      {
        p: "Nous pourrions devoir vérifier votre identité avant de donner suite à une demande. Nous demanderons seulement les renseignements raisonnablement nécessaires à cette vérification.",
      },
      { p: "Si nous ne pouvons pas donner suite à une demande, nous vous en expliquerons la raison, sous réserve des restrictions légales." },
    ],
  },
  {
    title: "12. Sites tiers",
    blocks: [
      {
        p: "Notre site peut contenir des liens vers des prêteurs, des partenaires de recommandation ou d'autres sites tiers. Leur collecte et leur utilisation des renseignements personnels sont régies par leurs propres politiques de confidentialité.",
      },
      { p: "Lisez la politique du fournisseur concerné avant de soumettre d'autres renseignements ou d'accepter ses services." },
    ],
  },
  {
    title: "13. Exigences d'âge",
    blocks: [
      {
        p: "Nos services de recommandation s'adressent aux résidents du Canada qui ont atteint l'âge de la majorité dans leur province ou territoire.",
      },
      {
        p: "Si vous croyez qu'une personne mineure nous a fourni des renseignements personnels par notre site, communiquez avec nous afin que nous puissions examiner la situation et y remédier.",
      },
    ],
  },
  {
    title: "14. Modifications de cette politique",
    blocks: [
      {
        p: "Nous pouvons mettre à jour cette politique pour tenir compte de changements à nos services, à nos pratiques ou à nos obligations légales. La version à jour paraîtra sur cette page avec une nouvelle date.",
      },
      { p: "Pour les changements importants, nous donnerons un avis supplémentaire et obtiendrons un nouveau consentement lorsque la loi l'exige." },
    ],
  },
  {
    title: "15. Joindre notre responsable de la protection des renseignements personnels",
    blocks: [
      { p: "Pour toute question, demande ou plainte relative à la vie privée, communiquez avec :" },
      {
        lines: [
          "Responsable de la protection des renseignements personnels — Norden Capital",
          "Entité juridique : {company}",
          "Courriel : {privacyEmail}",
          "Adresse postale : {address}",
          "Site Web : {site}",
        ],
      },
      { p: "Si votre préoccupation n'est pas réglée, vous pouvez vous adresser à l'organisme de protection de la vie privée responsable de votre territoire." },
    ],
  },
];
