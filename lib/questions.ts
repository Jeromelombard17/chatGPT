import { Dimension } from "./types";

export const dimensions: Dimension[] = [
  {
    id: "business",
    title: "Compréhension du business et des stakeholders",
    questions: [
      {
        id: "Q1",
        text: "Je peux expliquer clairement la stratégie business de mes principaux stakeholders."
      },
      {
        id: "Q2",
        text: "Je connais les KPI métier sur lesquels mes stakeholders sont évalués."
      },
      {
        id: "Q3",
        text: "Je comprends les priorités opérationnelles de mes stakeholders au-delà de leurs demandes achats."
      },
      {
        id: "Q4",
        text: "Je sais expliquer comment mon périmètre achats contribue (ou pourrait contribuer) à leurs objectifs business."
      },
      {
        id: "Q5",
        text: "Quand un stakeholder formule une demande, je comprends le problème métier sous-jacent."
      },
      {
        id: "Q6",
        text: "Je suis capable de décrire la chaîne de valeur du métier que je supporte."
      }
    ]
  },
  {
    id: "proactivite",
    title: "Proactivité et anticipation",
    questions: [
      {
        id: "Q7",
        text: "J’anticipe régulièrement des besoins avant qu’ils ne soient formalisés."
      },
      {
        id: "Q8",
        text: "Je propose des initiatives sans attendre une demande achats explicite."
      },
      {
        id: "Q9",
        text: "Mes propositions sont basées sur une compréhension du fonctionnement interne des métiers."
      },
      {
        id: "Q10",
        text: "Je fais une veille active sur les solutions fournisseurs pertinentes pour le business."
      },
      {
        id: "Q11",
        text: "Je challenge les demandes quand elles ne répondent pas au vrai problème business."
      },
      {
        id: "Q12",
        text: "Mes stakeholders me sollicitent en amont de leurs projets."
      }
    ]
  },
  {
    id: "relations",
    title: "Relations et influence au bon niveau",
    questions: [
      {
        id: "Q13",
        text: "J’ai des échanges réguliers avec des décideurs métier de niveau élevé (n-1, direction, comité)."
      },
      {
        id: "Q14",
        text: "Je connais les acteurs clés qui influencent réellement les décisions."
      },
      {
        id: "Q15",
        text: "Je construis volontairement des relations au-delà des projets achats en cours."
      },
      {
        id: "Q16",
        text: "Je suis perçu comme un partenaire utile, pas uniquement comme un expert achats."
      },
      {
        id: "Q17",
        text: "Je suis capable d’influencer une décision sans autorité hiérarchique."
      },
      {
        id: "Q18",
        text: "Je suis impliqué dans des discussions avant que les solutions ne soient décidées."
      }
    ]
  },
  {
    id: "strategie",
    title: "Stratégie achats alignée business",
    questions: [
      {
        id: "Q19",
        text: "Mes stratégies catégories partent d’un problème business à résoudre."
      },
      {
        id: "Q20",
        text: "Je définis la valeur recherchée avant de définir des leviers achats."
      },
      {
        id: "Q21",
        text: "La réduction de fournisseurs ou de prix n’est jamais un objectif en soi."
      },
      {
        id: "Q22",
        text: "Je sais expliquer la valeur business d’une stratégie achats sans parler d’outils achats."
      },
      {
        id: "Q23",
        text: "Mes stratégies intègrent des leviers autres que le coût (risque, efficacité, innovation, time-to-market…)."
      },
      {
        id: "Q24",
        text: "Je remets en cause des “bonnes pratiques achats” si elles ne créent pas de valeur métier."
      }
    ]
  },
  {
    id: "communication",
    title: "Communication et langage business",
    questions: [
      {
        id: "Q25",
        text: "J’adapte systématiquement mon discours au langage et aux priorités du métier."
      },
      {
        id: "Q26",
        text: "Je présente mes initiatives en termes d’impact business et non d’actions achats."
      },
      {
        id: "Q27",
        text: "Je sais pitcher une stratégie achats en moins de 5 minutes à un décideur."
      },
      {
        id: "Q28",
        text: "J’utilise des exemples concrets et des histoires pour convaincre."
      },
      {
        id: "Q29",
        text: "Mes présentations conduisent à des décisions, pas uniquement à des validations."
      },
      {
        id: "Q30",
        text: "Mes stakeholders comprennent clairement la contribution des achats à leur performance."
      }
    ]
  }
];

export const openQuestions = [
  {
    id: "O1",
    text: "Cite un problème business concret que rencontrent aujourd’hui tes principaux stakeholders (indépendamment des achats)."
  },
  {
    id: "O2",
    text: "Prends une initiative achats récente. Quel problème métier précis cherchait-elle à résoudre au départ ?"
  },
  {
    id: "O3",
    text: "Si tu avais 3 minutes pour convaincre un directeur métier que ton approche achats crée de la valeur pour lui, que dirais-tu ?"
  }
];
