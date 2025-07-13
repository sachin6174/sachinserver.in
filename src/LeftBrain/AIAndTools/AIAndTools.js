import React from "react";
import "../shared-styles.css";
import "./AIAndTools.css";

const AIAndTools = () => {
    const aiFrameworks = [
        {
            name: "TensorFlow",
            description: "Google's open-source machine learning framework for deep learning and neural networks.",
            icon: "🧠",
            features: ["Deep Learning", "Neural Networks", "Production Ready", "Cross-Platform"]
        },
        {
            name: "PyTorch",
            description: "Facebook's dynamic neural network framework with strong research community support.",
            icon: "🔥",
            features: ["Dynamic Graphs", "Research Friendly", "GPU Acceleration", "Python Native"]
        },
        {
            name: "Core ML",
            description: "Apple's framework for integrating machine learning models into iOS and macOS apps.",
            icon: "🍎",
            features: ["On-Device Inference", "Privacy Focused", "Optimized Performance", "iOS Integration"]
        },
        {
            name: "Hugging Face",
            description: "Transformers library for natural language processing with pre-trained models.",
            icon: "🤗",
            features: ["Pre-trained Models", "NLP Focus", "Easy Integration", "Community Driven"]
        }
    ];

    const aiTools = [
        {
            name: "Jupyter Notebooks",
            icon: "📓",
            description: "Interactive development environment for data science",
            use: "Prototyping, experimentation, and documentation"
        },
        {
            name: "Google Colab",
            icon: "☁️",
            description: "Cloud-based Jupyter environment with free GPU access",
            use: "Training models without local hardware requirements"
        },
        {
            name: "Weights & Biases",
            icon: "📊",
            description: "Experiment tracking and model versioning platform",
            use: "MLOps and experiment management"
        },
        {
            name: "Docker",
            icon: "🐳",
            description: "Containerization for reproducible ML environments",
            use: "Deployment and environment consistency"
        },
        {
            name: "MLflow",
            icon: "🔄",
            description: "Open-source platform for ML lifecycle management",
            use: "Model tracking, packaging, and deployment"
        },
        {
            name: "Tensorboard",
            icon: "📈",
            description: "Visualization toolkit for machine learning experimentation",
            use: "Monitoring training progress and model analysis"
        }
    ];

    const codeExamples = [
        {
            title: "TensorFlow - Neural Network Implementation",
            code: `import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

# Load and preprocess data
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Normalize pixel values to 0-1 range
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

# Reshape data for CNN
x_train = x_train.reshape(-1, 28, 28, 1)
x_test = x_test.reshape(-1, 28, 28, 1)

# Convert labels to categorical
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

# Build CNN model
model = keras.Sequential([
    keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation='softmax')
])

# Compile model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Define callbacks
early_stopping = keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

reduce_lr = keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,
    patience=3,
    min_lr=0.0001
)

# Train model
history = model.fit(
    x_train, y_train,
    batch_size=128,
    epochs=50,
    validation_data=(x_test, y_test),
    callbacks=[early_stopping, reduce_lr],
    verbose=1
)

# Evaluate model
test_loss, test_accuracy = model.evaluate(x_test, y_test, verbose=0)
print(f"Test accuracy: {test_accuracy:.4f}")

# Save model
model.save('mnist_cnn_model.h5')

# Make predictions
predictions = model.predict(x_test[:5])
predicted_classes = np.argmax(predictions, axis=1)
actual_classes = np.argmax(y_test[:5], axis=1)

print("Predictions:", predicted_classes)
print("Actual:", actual_classes)`
        },
        {
            title: "PyTorch - Custom Dataset and Training Loop",
            code: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as transforms
from PIL import Image
import os

# Custom Dataset Class
class CustomImageDataset(Dataset):
    def __init__(self, image_dir, labels, transform=None):
        self.image_dir = image_dir
        self.labels = labels
        self.transform = transform
        self.image_files = os.listdir(image_dir)
    
    def __len__(self):
        return len(self.image_files)
    
    def __getitem__(self, idx):
        img_path = os.path.join(self.image_dir, self.image_files[idx])
        image = Image.open(img_path).convert('RGB')
        label = self.labels[idx]
        
        if self.transform:
            image = self.transform(image)
        
        return image, label

# Define transforms
train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(degrees=15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                        std=[0.229, 0.224, 0.225])
])

# Custom CNN Model
class CustomCNN(nn.Module):
    def __init__(self, num_classes):
        super(CustomCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            nn.AdaptiveAvgPool2d((7, 7))
        )
        
        self.classifier = nn.Sequential(
            nn.Dropout(p=0.5),
            nn.Linear(256 * 7 * 7, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(p=0.5),
            nn.Linear(512, num_classes)
        )
    
    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x

# Training function
def train_model(model, train_loader, val_loader, num_epochs=25):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)
    
    best_val_acc = 0.0
    
    for epoch in range(num_epochs):
        # Training phase
        model.train()
        running_loss = 0.0
        correct_predictions = 0
        total_samples = 0
        
        for batch_idx, (data, targets) in enumerate(train_loader):
            data, targets = data.to(device), targets.to(device)
            
            optimizer.zero_grad()
            outputs = model(data)
            loss = criterion(outputs, targets)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total_samples += targets.size(0)
            correct_predictions += (predicted == targets).sum().item()
        
        train_acc = 100 * correct_predictions / total_samples
        
        # Validation phase
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for data, targets in val_loader:
                data, targets = data.to(device), targets.to(device)
                outputs = model(data)
                loss = criterion(outputs, targets)
                
                val_loss += loss.item()
                _, predicted = torch.max(outputs.data, 1)
                val_total += targets.size(0)
                val_correct += (predicted == targets).sum().item()
        
        val_acc = 100 * val_correct / val_total
        
        print(f'Epoch [{epoch+1}/{num_epochs}]')
        print(f'Train Loss: {running_loss/len(train_loader):.4f}, Train Acc: {train_acc:.2f}%')
        print(f'Val Loss: {val_loss/len(val_loader):.4f}, Val Acc: {val_acc:.2f}%')
        
        # Save best model
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), 'best_model.pth')
        
        scheduler.step()
        print('-' * 50)
    
    return model

# Usage example
# dataset = CustomImageDataset('path/to/images', labels, transform=train_transform)
# train_loader = DataLoader(dataset, batch_size=32, shuffle=True)
# model = CustomCNN(num_classes=10)
# trained_model = train_model(model, train_loader, val_loader)`
        },
        {
            title: "Core ML - iOS Integration",
            code: `import CoreML
import Vision
import UIKit

// MARK: - Core ML Model Integration
class ImageClassifierViewController: UIViewController {
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var predictionLabel: UILabel!
    
    private var model: VNCoreMLModel?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupCoreMLModel()
    }
    
    private func setupCoreMLModel() {
        guard let modelURL = Bundle.main.url(forResource: "ImageClassifier", withExtension: "mlmodelc"),
              let mlModel = try? MLModel(contentsOf: modelURL),
              let visionModel = try? VNCoreMLModel(for: mlModel) else {
            print("Failed to load Core ML model")
            return
        }
        
        self.model = visionModel
    }
    
    @IBAction func selectImageTapped(_ sender: UIButton) {
        let imagePicker = UIImagePickerController()
        imagePicker.delegate = self
        imagePicker.sourceType = .photoLibrary
        present(imagePicker, animated: true)
    }
    
    private func classifyImage(_ image: UIImage) {
        guard let model = model,
              let ciImage = CIImage(image: image) else {
            return
        }
        
        let request = VNCoreMLRequest(model: model) { [weak self] request, error in
            DispatchQueue.main.async {
                self?.processClassificationResults(request.results)
            }
        }
        
        request.imageCropAndScaleOption = .centerCrop
        
        let handler = VNImageRequestHandler(ciImage: ciImage, orientation: .up)
        
        do {
            try handler.perform([request])
        } catch {
            print("Failed to perform classification: \\(error)")
        }
    }
    
    private func processClassificationResults(_ results: [VNObservation]?) {
        guard let results = results as? [VNClassificationObservation],
              let topResult = results.first else {
            predictionLabel.text = "Unable to classify image"
            return
        }
        
        let confidence = Int(topResult.confidence * 100)
        predictionLabel.text = "\\(topResult.identifier) (\\(confidence)% confidence)"
        
        // Display top 3 predictions
        let top3 = Array(results.prefix(3))
        var resultText = "Top predictions:\\n"
        
        for (index, result) in top3.enumerated() {
            let confidence = Int(result.confidence * 100)
            resultText += "\\(index + 1). \\(result.identifier): \\(confidence)%\\n"
        }
        
        print(resultText)
    }
}

// MARK: - Image Picker Delegate
extension ImageClassifierViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
        picker.dismiss(animated: true)
        
        guard let image = info[.originalImage] as? UIImage else {
            return
        }
        
        imageView.image = image
        classifyImage(image)
    }
}

// MARK: - Custom Core ML Model Training Pipeline
class CoreMLModelCreator {
    
    static func createImageClassifier(from trainingData: [String: [UIImage]]) {
        // This would typically be done in Python using Create ML or TensorFlow
        // Then converted to Core ML format
        
        /*
        Python equivalent for creating Core ML model:
        
        import coremltools as ct
        import tensorflow as tf
        
        # Train your TensorFlow model
        model = create_and_train_tensorflow_model()
        
        # Convert to Core ML
        coreml_model = ct.convert(
            model,
            inputs=[ct.ImageType(shape=(1, 224, 224, 3), bias=[-1, -1, -1], scale=1/127.5)]
        )
        
        # Set metadata
        coreml_model.short_description = "Image Classifier"
        coreml_model.input_description["image"] = "Input image"
        coreml_model.output_description["classLabel"] = "Predicted class"
        
        # Save the model
        coreml_model.save("ImageClassifier.mlmodel")
        */
    }
    
    // Real-time prediction with camera
    static func setupRealTimeClassification(in viewController: UIViewController) {
        // Implementation for live camera classification
        // Using AVCaptureSession and Vision framework
    }
}

// MARK: - Model Performance Monitoring
class MLModelMonitor {
    
    static func logPrediction(
        modelName: String,
        input: String,
        prediction: String,
        confidence: Float,
        processingTime: TimeInterval
    ) {
        let logData = [
            "model": modelName,
            "input": input,
            "prediction": prediction,
            "confidence": confidence,
            "processing_time": processingTime,
            "timestamp": Date().timeIntervalSince1970
        ] as [String : Any]
        
        // Send to analytics service or local storage
        print("Model Performance: \\(logData)")
    }
    
    static func trackModelAccuracy(
        predictions: [String],
        actualLabels: [String]
    ) -> Float {
        let correct = zip(predictions, actualLabels).reduce(0) { count, pair in
            return count + (pair.0 == pair.1 ? 1 : 0)
        }
        
        return Float(correct) / Float(predictions.count)
    }
}`
        }
    ];

    const mlPipelineSteps = [
        { name: "Data Collection", type: "data", description: "Gather and organize training data" },
        { name: "Preprocessing", type: "data", description: "Clean and prepare data for training" },
        { name: "Model Training", type: "training", description: "Train ML algorithms on prepared data" },
        { name: "Validation", type: "evaluation", description: "Evaluate model performance" },
        { name: "Deployment", type: "deployment", description: "Deploy model to production" },
        { name: "Monitoring", type: "deployment", description: "Monitor model performance in production" }
    ];

    const performanceMetrics = [
        { name: "Accuracy", value: "94.2%", description: "Overall correctness" },
        { name: "Precision", value: "91.8%", description: "True positive rate" },
        { name: "Recall", value: "93.5%", description: "Sensitivity measure" },
        { name: "F1-Score", value: "92.6%", description: "Harmonic mean of precision and recall" },
        { name: "Inference Time", value: "12ms", description: "Prediction latency" },
        { name: "Model Size", value: "2.3MB", description: "Deployment footprint" }
    ];

    const aiApplications = [
        {
            name: "Computer Vision",
            description: "Image classification, object detection, facial recognition",
            examples: ["Medical imaging", "Autonomous vehicles", "Security systems"]
        },
        {
            name: "Natural Language Processing",
            description: "Text analysis, language translation, chatbots",
            examples: ["Sentiment analysis", "Machine translation", "Question answering"]
        },
        {
            name: "Recommendation Systems",
            description: "Personalized content and product recommendations",
            examples: ["E-commerce", "Streaming services", "Social media"]
        },
        {
            name: "Predictive Analytics",
            description: "Forecasting and trend analysis",
            examples: ["Financial modeling", "Weather prediction", "Supply chain optimization"]
        },
        {
            name: "Robotics",
            description: "Autonomous navigation and manipulation",
            examples: ["Industrial automation", "Service robots", "Medical robotics"]
        },
        {
            name: "Speech Recognition",
            description: "Voice-to-text and voice commands",
            examples: ["Virtual assistants", "Transcription services", "Voice interfaces"]
        }
    ];

    const developmentLifecycle = [
        {
            phase: "Problem Definition",
            description: "Define the business problem and success metrics",
            deliverables: ["Problem statement", "Success criteria", "Data requirements"]
        },
        {
            phase: "Data Engineering",
            description: "Collect, clean, and prepare data for modeling",
            deliverables: ["Data pipeline", "Feature engineering", "Data validation"]
        },
        {
            phase: "Model Development",
            description: "Design, train, and optimize machine learning models",
            deliverables: ["Model architecture", "Training pipeline", "Hyperparameter tuning"]
        },
        {
            phase: "Model Evaluation",
            description: "Validate model performance and business impact",
            deliverables: ["Performance metrics", "A/B testing", "Business validation"]
        },
        {
            phase: "Deployment",
            description: "Deploy models to production environment",
            deliverables: ["Model serving", "API endpoints", "Monitoring setup"]
        },
        {
            phase: "Monitoring & Maintenance",
            description: "Monitor model performance and retrain as needed",
            deliverables: ["Performance dashboards", "Drift detection", "Model updates"]
        }
    ];

    const modelArchitectures = [
        {
            name: "Convolutional Neural Networks (CNN)",
            description: "Specialized for image processing and computer vision tasks",
            use: "Image classification, object detection"
        },
        {
            name: "Recurrent Neural Networks (RNN/LSTM)",
            description: "Designed for sequential data and time series",
            use: "Natural language processing, time series forecasting"
        },
        {
            name: "Transformer Models",
            description: "Attention-based architecture for language understanding",
            use: "Language translation, text generation, chatbots"
        },
        {
            name: "Generative Adversarial Networks (GAN)",
            description: "Two competing networks for data generation",
            use: "Image generation, data augmentation"
        },
        {
            name: "Decision Trees/Random Forest",
            description: "Tree-based models for classification and regression",
            use: "Tabular data, feature importance analysis"
        },
        {
            name: "Support Vector Machines (SVM)",
            description: "Maximum margin classifiers for complex boundaries",
            use: "Text classification, small dataset problems"
        }
    ];

    const researchTrends = [
        { name: "Large Language Models", icon: "🤖", description: "GPT, BERT, and transformer architectures" },
        { name: "Computer Vision", icon: "👁️", description: "Object detection and image segmentation" },
        { name: "Reinforcement Learning", icon: "🎮", description: "Learning through interaction and rewards" },
        { name: "AutoML", icon: "⚙️", description: "Automated machine learning pipelines" },
        { name: "Edge AI", icon: "📱", description: "On-device machine learning inference" },
        { name: "Explainable AI", icon: "🔍", description: "Interpretable and transparent models" }
    ];

    const deploymentOptions = [
        { name: "Cloud APIs", description: "Managed AI services (AWS, GCP, Azure)" },
        { name: "On-Premise", description: "Self-hosted infrastructure and models" },
        { name: "Edge Devices", description: "Mobile and IoT device deployment" },
        { name: "Hybrid", description: "Combination of cloud and edge computing" }
    ];

    const optimizationTechniques = [
        "Use appropriate data preprocessing and normalization",
        "Implement proper train/validation/test data splits",
        "Apply regularization techniques to prevent overfitting",
        "Use transfer learning when possible for faster training",
        "Optimize hyperparameters with systematic search methods",
        "Monitor training with early stopping and learning rate scheduling",
        "Implement model versioning and experiment tracking",
        "Use ensemble methods to improve model robustness",
        "Optimize model inference speed for production deployment",
        "Implement continuous integration and deployment for ML models"
    ];

    const ethicsGuidelines = [
        "Ensure data privacy and user consent in all AI applications",
        "Address bias and fairness in training data and model outcomes",
        "Implement transparency and explainability in AI decision-making",
        "Consider the societal impact of AI systems and automation",
        "Establish accountability and human oversight for AI decisions",
        "Protect against adversarial attacks and model vulnerabilities",
        "Ensure AI systems are accessible and inclusive for all users",
        "Maintain security and prevent misuse of AI technologies"
    ];

    const skills = [
        { name: "Machine Learning", level: 88 },
        { name: "Deep Learning", level: 85 },
        { name: "Python/TensorFlow", level: 90 },
        { name: "Data Preprocessing", level: 92 },
        { name: "Model Deployment", level: 82 },
        { name: "MLOps", level: 80 },
        { name: "Computer Vision", level: 86 },
        { name: "NLP", level: 83 }
    ];

    return (
        <div className="leftbrain-container ai-tools-section">
            {/* Header Section */}
            <div className="simple-header">
                <h1>AI and Tools</h1>
                <p>Machine learning frameworks, artificial intelligence development tools, and modern ML workflows</p>
            </div>

            {/* AI Frameworks */}
            <div className="cards-container">
                {aiFrameworks.map((framework, index) => (
                    <div key={index} className="leftbrain-card ai-framework-card">
                        <div className="tech-icon">{framework.icon}</div>
                        <h3>{framework.name}</h3>
                        <p>{framework.description}</p>
                        <div className="tech-stack">
                            {framework.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ML Pipeline Visualization */}
            <div className="ml-pipeline-visualization">
                <h4>🔄 Machine Learning Pipeline</h4>
                <p>End-to-end workflow for developing and deploying ML models</p>
                <div className="pipeline-steps">
                    {mlPipelineSteps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className={`pipeline-step ${step.type}`}>
                                <strong>{step.name}</strong>
                                <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                    {step.description}
                                </div>
                            </div>
                            {index < mlPipelineSteps.length - 1 && (
                                <span className="pipeline-arrow">→</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* AI Tools Grid */}
            <div className="section">
                <h2>Essential AI Development Tools</h2>
                <div className="ai-tools-grid">
                    {aiTools.map((tool, index) => (
                        <div key={index} className="ai-tool-card">
                            <h4>{tool.icon} {tool.name}</h4>
                            <p>{tool.description}</p>
                            <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <strong>Use case:</strong> {tool.use}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>AI Implementation Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="ai-code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Neural Network Diagram */}
            <div className="neural-network-diagram">
                <h4>🧠 Neural Network Architecture</h4>
                <div className="network-layers">
                    <div className="network-layer">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="neuron">I</div>
                        ))}
                        <div className="layer-label">Input Layer</div>
                    </div>
                    <div className="network-layer">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="neuron">H</div>
                        ))}
                        <div className="layer-label">Hidden Layer 1</div>
                    </div>
                    <div className="network-layer">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="neuron">H</div>
                        ))}
                        <div className="layer-label">Hidden Layer 2</div>
                    </div>
                    <div className="network-layer">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="neuron">O</div>
                        ))}
                        <div className="layer-label">Output Layer</div>
                    </div>
                </div>
            </div>

            {/* Model Performance Metrics */}
            <div className="section">
                <h2>Model Performance Metrics</h2>
                <div className="model-performance-metrics">
                    {performanceMetrics.map((metric, index) => (
                        <div key={index} className="performance-metric">
                            <h5>{metric.name}</h5>
                            <span className="metric-value">{metric.value}</span>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {metric.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Applications */}
            <div className="section">
                <h2>AI Application Domains</h2>
                <div className="ai-applications-grid">
                    {aiApplications.map((application, index) => (
                        <div key={index} className="ai-application-card">
                            <h5>{application.name}</h5>
                            <p>{application.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Examples:</strong>
                                <ul>
                                    {application.examples.map((example, idx) => (
                                        <li key={idx}>{example}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Model Architectures */}
            <div className="section">
                <h2>Popular Model Architectures</h2>
                <div className="model-architectures">
                    {modelArchitectures.map((architecture, index) => (
                        <div key={index} className="architecture-card">
                            <h5>{architecture.name}</h5>
                            <p>{architecture.description}</p>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <strong>Best for:</strong> {architecture.use}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Development Lifecycle */}
            <div className="section">
                <h2>AI Development Lifecycle</h2>
                <div className="development-lifecycle">
                    {developmentLifecycle.map((phase, index) => (
                        <div key={index} className="lifecycle-phase">
                            <h4>Phase {index + 1}: {phase.phase}</h4>
                            <p>{phase.description}</p>
                            <div style={{ marginTop: '0.75rem' }}>
                                <strong>Key Deliverables:</strong>
                                <ul>
                                    {phase.deliverables.map((deliverable, idx) => (
                                        <li key={idx}>{deliverable}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Research Trends */}
            <div className="section">
                <h2>Current AI Research Trends</h2>
                <div className="ai-research-trends">
                    {researchTrends.map((trend, index) => (
                        <div key={index} className="research-trend-card">
                            <span className="trend-icon">{trend.icon}</span>
                            <h4>{trend.name}</h4>
                            <p>{trend.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cloud AI Services */}
            <div className="cloud-ai-services">
                <h4>☁️ Cloud AI Services Integration</h4>
                <ul>
                    <li><strong>AWS:</strong> SageMaker, Rekognition, Comprehend, Lex</li>
                    <li><strong>Google Cloud:</strong> AI Platform, Vision API, Natural Language API</li>
                    <li><strong>Azure:</strong> Machine Learning, Cognitive Services, Bot Framework</li>
                    <li><strong>IBM Watson:</strong> Discovery, Assistant, Natural Language Understanding</li>
                    <li><strong>Hugging Face:</strong> Transformers, Datasets, Model Hub</li>
                    <li><strong>OpenAI:</strong> GPT API, DALL-E, Whisper</li>
                </ul>
            </div>

            {/* AI Deployment Strategies */}
            <div className="ai-deployment-strategies">
                <h4>🚀 AI Deployment Strategies</h4>
                <div className="deployment-options">
                    {deploymentOptions.map((option, index) => (
                        <div key={index} className="deployment-option">
                            <h5>{option.name}</h5>
                            <p>{option.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Data Science Workflow */}
            <div className="data-science-workflow">
                <h4>📊 Data Science Workflow Best Practices</h4>
                <ul>
                    <li>Start with clear business objectives and success metrics</li>
                    <li>Perform thorough exploratory data analysis (EDA)</li>
                    <li>Implement robust data validation and quality checks</li>
                    <li>Use version control for both code and data</li>
                    <li>Create reproducible experiments with proper documentation</li>
                    <li>Establish baseline models before complex implementations</li>
                    <li>Implement comprehensive testing for data pipelines</li>
                    <li>Monitor model performance and data drift in production</li>
                </ul>
            </div>

            {/* AI Ethics Guidelines */}
            <div className="ai-ethics-guidelines">
                <h4>⚖️ AI Ethics and Responsible Development</h4>
                <ul>
                    {ethicsGuidelines.map((guideline, index) => (
                        <li key={index}>{guideline}</li>
                    ))}
                </ul>
            </div>

            {/* Optimization Checklist */}
            <div className="optimization-checklist">
                <h4>⚡ ML Model Optimization Checklist</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '0.5rem' }}>
                    {optimizationTechniques.map((technique, index) => (
                        <div key={index} className="optimization-item">
                            <span className="optimization-check">✓</span>
                            <span>{technique}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>AI Development Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #F59E0B, #F97316)',
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
        </div>
    );
};

export default AIAndTools;