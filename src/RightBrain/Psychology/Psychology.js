import React from "react";
import "../shared-styles.css";
import "./Psychology.css";

const Psychology = () => {
    const psychologyConcepts = [
        {
            name: "Cognitive Psychology",
            description: "Study of mental processes including perception, memory, reasoning, and decision-making.",
            icon: "🧠",
            features: ["Memory Systems", "Attention Theory", "Problem Solving", "Language Processing"]
        },
        {
            name: "Behavioral Psychology",
            description: "Focus on observable behaviors and how they are learned and modified through experience.",
            icon: "🔄",
            features: ["Classical Conditioning", "Operant Conditioning", "Reinforcement", "Behavior Modification"]
        },
        {
            name: "Social Psychology",
            description: "Examination of how people think, feel, and behave in social situations and group contexts.",
            icon: "👥",
            features: ["Social Influence", "Group Dynamics", "Prejudice", "Attribution Theory"]
        },
        {
            name: "Developmental Psychology",
            description: "Study of psychological growth and changes throughout the human lifespan.",
            icon: "📈",
            features: ["Child Development", "Cognitive Development", "Moral Development", "Life Stages"]
        }
    ];

    const cognitiveBiases = [
        { name: "Confirmation Bias", description: "Seeking information that confirms existing beliefs" },
        { name: "Anchoring Bias", description: "Over-relying on first piece of information encountered" },
        { name: "Availability Heuristic", description: "Judging probability by how easily examples come to mind" },
        { name: "Dunning-Kruger Effect", description: "Overconfidence in areas of low ability" },
        { name: "Loss Aversion", description: "Preferring avoiding losses over acquiring gains" },
        { name: "Sunk Cost Fallacy", description: "Continuing investment based on previously invested resources" },
        { name: "Halo Effect", description: "Overall impression influences specific traits evaluation" },
        { name: "Survivorship Bias", description: "Focusing on successful outcomes while ignoring failures" }
    ];

    const therapyApproaches = [
        {
            name: "Cognitive Behavioral Therapy (CBT)",
            icon: "🎯",
            description: "Focus on changing negative thought patterns and behaviors",
            techniques: ["Thought records", "Behavioral experiments", "Exposure therapy", "Cognitive restructuring"]
        },
        {
            name: "Psychodynamic Therapy",
            icon: "🔍",
            description: "Explore unconscious thoughts and past experiences",
            techniques: ["Free association", "Dream analysis", "Transference", "Defense mechanisms"]
        },
        {
            name: "Humanistic Therapy",
            icon: "🌱",
            description: "Emphasize personal growth and self-actualization",
            techniques: ["Active listening", "Unconditional positive regard", "Empathy", "Self-reflection"]
        },
        {
            name: "Mindfulness-Based Therapy",
            icon: "🧘",
            description: "Present-moment awareness and acceptance-based approaches",
            techniques: ["Meditation", "Body awareness", "Acceptance", "Non-judgmental observation"]
        }
    ];

    const personalityTheories = [
        {
            theory: "Big Five Model",
            description: "Five major personality dimensions that capture individual differences",
            dimensions: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"]
        },
        {
            theory: "Myers-Briggs Type Indicator",
            description: "Psychological preferences in how people perceive and make decisions",
            dimensions: ["Extraversion/Introversion", "Sensing/Intuition", "Thinking/Feeling", "Judging/Perceiving"]
        },
        {
            theory: "Freud's Psychoanalytic Theory",
            description: "Personality structure based on unconscious drives and early experiences",
            dimensions: ["Id (pleasure principle)", "Ego (reality principle)", "Superego (moral principle)"]
        }
    ];

    const famousExperiments = [
        {
            name: "Stanford Prison Experiment",
            researcher: "Philip Zimbardo (1971)",
            description: "Demonstrated how social roles can influence behavior and lead to abuse of power",
            findings: "Normal individuals adopted extreme behaviors based on assigned roles",
            ethical: true
        },
        {
            name: "Milgram Obedience Study",
            researcher: "Stanley Milgram (1961)",
            description: "Examined willingness to obey authority figures even when causing harm",
            findings: "65% of participants delivered maximum shock when ordered by authority",
            ethical: true
        },
        {
            name: "Little Albert Experiment",
            researcher: "John Watson (1920)",
            description: "Classical conditioning of fear response in an infant",
            findings: "Demonstrated that emotional responses could be conditioned",
            ethical: true
        },
        {
            name: "Pavlov's Dogs",
            researcher: "Ivan Pavlov (1890s)",
            description: "Discovery of classical conditioning through salivation responses",
            findings: "Neutral stimuli can trigger conditioned responses through association",
            ethical: false
        }
    ];

    const psychologyHistory = [
        {
            period: "Ancient Philosophy",
            timeframe: "500 BCE - 500 CE",
            contributions: ["Aristotle's De Anima", "Plato's theory of mind", "Early discussions of consciousness"]
        },
        {
            period: "Emergence of Psychology",
            timeframe: "1879 - 1920",
            contributions: ["Wilhelm Wundt's first psychology lab", "Structuralism", "Functionalism", "Behaviorism begins"]
        },
        {
            period: "Behaviorist Era",
            timeframe: "1920 - 1960",
            contributions: ["Watson's behaviorism", "Skinner's operant conditioning", "Focus on observable behavior"]
        },
        {
            period: "Cognitive Revolution",
            timeframe: "1960 - 1980",
            contributions: ["Information processing model", "Cognitive psychology emergence", "Computer metaphor of mind"]
        },
        {
            period: "Modern Psychology",
            timeframe: "1980 - Present",
            contributions: ["Neuroscience integration", "Positive psychology", "Evidence-based practice", "Cultural psychology"]
        }
    ];

    const emotionCategories = [
        { name: "Joy", icon: "😊", type: "primary" },
        { name: "Sadness", icon: "😢", type: "primary" },
        { name: "Anger", icon: "😠", type: "primary" },
        { name: "Fear", icon: "😨", type: "primary" },
        { name: "Surprise", icon: "😮", type: "primary" },
        { name: "Disgust", icon: "🤢", type: "primary" },
        { name: "Trust", icon: "🤝", type: "secondary" },
        { name: "Anticipation", icon: "🤔", type: "secondary" }
    ];

    const learningTheories = [
        {
            name: "Classical Conditioning",
            theorist: "Ivan Pavlov",
            description: "Learning through association between stimuli",
            example: "Dog salivating at bell sound associated with food"
        },
        {
            name: "Operant Conditioning",
            theorist: "B.F. Skinner",
            description: "Learning through consequences of behavior",
            example: "Child doing homework to receive praise (positive reinforcement)"
        },
        {
            name: "Social Learning Theory",
            theorist: "Albert Bandura",
            description: "Learning through observation and imitation",
            example: "Children learning aggressive behavior by watching others"
        },
        {
            name: "Constructivism",
            theorist: "Jean Piaget",
            description: "Active construction of knowledge through experience",
            example: "Child developing understanding of conservation through experimentation"
        }
    ];

    const researchMethods = [
        { name: "Experimental Studies", icon: "🧪", description: "Controlled manipulation of variables" },
        { name: "Correlational Studies", icon: "📊", description: "Examining relationships between variables" },
        { name: "Case Studies", icon: "📋", description: "In-depth analysis of individuals or groups" },
        { name: "Observational Studies", icon: "👁️", description: "Systematic observation of behavior" },
        { name: "Surveys & Questionnaires", icon: "📝", description: "Self-report data collection" },
        { name: "Longitudinal Studies", icon: "📅", description: "Following subjects over time" }
    ];

    const psychologicalDisorders = [
        {
            category: "Anxiety Disorders",
            examples: ["Generalized Anxiety Disorder", "Panic Disorder", "Social Anxiety", "Phobias"]
        },
        {
            category: "Mood Disorders",
            examples: ["Major Depression", "Bipolar Disorder", "Dysthymia", "Seasonal Affective Disorder"]
        },
        {
            category: "Personality Disorders",
            examples: ["Borderline", "Narcissistic", "Antisocial", "Avoidant"]
        },
        {
            category: "Neurodevelopmental",
            examples: ["ADHD", "Autism Spectrum", "Learning Disabilities", "Intellectual Disability"]
        }
    ];

    const skills = [
        { name: "Research Methods", level: 85 },
        { name: "Statistical Analysis", level: 80 },
        { name: "Experimental Design", level: 88 },
        { name: "Cognitive Assessment", level: 82 },
        { name: "Behavioral Analysis", level: 87 },
        { name: "Literature Review", level: 90 },
        { name: "Ethical Guidelines", level: 92 },
        { name: "Data Interpretation", level: 86 }
    ];

    const psychologyApplications = [
        "Clinical and counseling psychology for mental health treatment",
        "Educational psychology for learning and teaching improvement",
        "Organizational psychology for workplace optimization",
        "Sports psychology for athletic performance enhancement",
        "Forensic psychology for legal system applications",
        "Health psychology for medical treatment compliance",
        "Consumer psychology for marketing and advertising",
        "Environmental psychology for space and behavior design"
    ];

    return (
        <div className="leftbrain-container psychology-section">
            {/* Header Section */}
            <div className="hero-section">
                <h1 className="section-title">Psychology</h1>
                <p>Scientific study of mind and behavior, exploring human thoughts, emotions, and actions</p>
                <div className="tech-stack">
                    <span className="psychology-badge">Cognitive Science</span>
                    <span className="psychology-badge">Behavioral Analysis</span>
                    <span className="psychology-badge">Research Methods</span>
                    <span className="psychology-badge">Mental Health</span>
                </div>
            </div>

            {/* Psychology Branches */}
            <div className="cards-container">
                {psychologyConcepts.map((concept, index) => (
                    <div key={index} className="leftbrain-card psychology-concept-card">
                        <div className="tech-icon">{concept.icon}</div>
                        <h3>{concept.name}</h3>
                        <p>{concept.description}</p>
                        <div className="tech-stack">
                            {concept.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Personality Theories */}
            <div className="section">
                <h2>Major Personality Theories</h2>
                {personalityTheories.map((theory, index) => (
                    <div key={index} className="personality-theory">
                        <h4>{theory.theory}</h4>
                        <p>{theory.description}</p>
                        <div style={{ marginTop: '0.75rem' }}>
                            <strong>Key Dimensions:</strong>
                            <ul>
                                {theory.dimensions.map((dimension, idx) => (
                                    <li key={idx}>{dimension}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cognitive Biases */}
            <div className="section">
                <h2>Common Cognitive Biases</h2>
                <div className="cognitive-biases-grid">
                    {cognitiveBiases.map((bias, index) => (
                        <div key={index} className="bias-card">
                            <h5>{bias.name}</h5>
                            <p>{bias.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emotion Wheel */}
            <div className="section">
                <h2>Basic Emotions</h2>
                <div className="emotion-wheel">
                    {emotionCategories.map((emotion, index) => (
                        <div key={index} className={`emotion-category ${emotion.type}`}>
                            <span className="emotion-icon">{emotion.icon}</span>
                            <span>{emotion.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Famous Experiments */}
            <div className="section">
                <h2>Landmark Psychology Experiments</h2>
                {famousExperiments.map((experiment, index) => (
                    <div key={index} className={`psychological-experiment ${experiment.ethical ? '' : 'famous'}`}>
                        <h4>{experiment.name}</h4>
                        <div style={{ marginBottom: '0.75rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                            {experiment.researcher}
                        </div>
                        <p><strong>Description:</strong> {experiment.description}</p>
                        <p><strong>Key Findings:</strong> {experiment.findings}</p>
                        {experiment.ethical && (
                            <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: '#FEF3C7', borderRadius: 'var(--radius-sm)' }}>
                                <small><strong>Note:</strong> This experiment would not meet current ethical standards and cannot be replicated today.</small>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Therapy Approaches */}
            <div className="section">
                <h2>Therapeutic Approaches</h2>
                <div className="therapy-approaches">
                    {therapyApproaches.map((approach, index) => (
                        <div key={index} className="therapy-card">
                            <h4>{approach.icon} {approach.name}</h4>
                            <p>{approach.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Key Techniques:</strong>
                                <ul>
                                    {approach.techniques.map((technique, idx) => (
                                        <li key={idx}>{technique}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Theories */}
            <div className="section">
                <h2>Learning Theories</h2>
                <div className="learning-theories-comparison">
                    {learningTheories.map((theory, index) => (
                        <div key={index} className="learning-theory-card">
                            <h4>{theory.name}</h4>
                            <div style={{ marginBottom: '0.75rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                                {theory.theorist}
                            </div>
                            <p><strong>Concept:</strong> {theory.description}</p>
                            <p><strong>Example:</strong> {theory.example}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Psychology History */}
            <div className="section">
                <h2>History of Psychology</h2>
                <div className="psychology-timeline">
                    {psychologyHistory.map((period, index) => (
                        <div key={index} className="timeline-period">
                            <h4>{period.period} ({period.timeframe})</h4>
                            <ul>
                                {period.contributions.map((contribution, idx) => (
                                    <li key={idx}>{contribution}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Research Methods */}
            <div className="section">
                <h2>Research Methods in Psychology</h2>
                <div className="research-methods-grid">
                    {researchMethods.map((method, index) => (
                        <div key={index} className="research-method-card">
                            <span className="research-method-icon">{method.icon}</span>
                            <h4>{method.name}</h4>
                            <p>{method.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Psychological Disorders */}
            <div className="section">
                <h2>Categories of Psychological Disorders</h2>
                <div className="psychological-disorders">
                    {psychologicalDisorders.map((category, index) => (
                        <div key={index} className="disorder-card">
                            <h5>{category.category}</h5>
                            <ul>
                                {category.examples.map((example, idx) => (
                                    <li key={idx}>{example}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mental Health Awareness */}
            <div className="mental-health-awareness">
                <h4>🌟 Mental Health Awareness</h4>
                <p>Psychology emphasizes the importance of mental health and well-being. Key principles include:</p>
                <ul>
                    <li>Mental health is as important as physical health</li>
                    <li>Seeking help is a sign of strength, not weakness</li>
                    <li>Early intervention can prevent more serious problems</li>
                    <li>Everyone's mental health journey is unique</li>
                    <li>Stigma reduction through education and understanding</li>
                </ul>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    If you're experiencing mental health challenges, please reach out to a qualified mental health professional.
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Psychology Research Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #8B5CF6, #A855F7)',
                                        height: '100%',
                                        borderRadius: 'inherit'
                                    }}
                                ></div>
                            </div>
                            <span>{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Applications */}
            <div className="section">
                <h2>Applications of Psychology</h2>
                <ul className="feature-list">
                    {psychologyApplications.map((application, index) => (
                        <li key={index}>{application}</li>
                    ))}
                </ul>
            </div>

            {/* Case Study Example */}
            <div className="section">
                <h2>Research Example: Memory Studies</h2>
                <div className="psychology-theory-block">
                    <h4>Levels of Processing Theory (Craik & Lockhart, 1972)</h4>
                    <p><strong>Hypothesis:</strong> Deeper levels of processing lead to better memory retention.</p>
                    <p><strong>Method:</strong> Participants processed words at different levels:</p>
                    <ul>
                        <li><strong>Shallow processing:</strong> Physical features (font, case)</li>
                        <li><strong>Phonemic processing:</strong> Sound characteristics (rhyming)</li>
                        <li><strong>Semantic processing:</strong> Meaning and associations</li>
                    </ul>
                    <p><strong>Results:</strong> Words processed semantically showed 3x better recall than those processed for physical features.</p>
                    <p><strong>Implications:</strong> Understanding and meaningful elaboration enhance learning and memory retention.</p>
                </div>
            </div>
        </div>
    );
};

export default Psychology;