import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, SkipForward, RotateCcw } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  target?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  action?: string;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
}

interface TutorialSystemProps {
  isOpen: boolean;
  onClose: () => void;
  activeTutorial?: string;
  onComplete?: (tutorialId: string) => void;
}

const TutorialSystem: React.FC<TutorialSystemProps> = ({ 
  isOpen, 
  onClose, 
  activeTutorial = 'welcome',
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTutorial, setSelectedTutorial] = useState<string>(activeTutorial);
  const [showTutorialList, setShowTutorialList] = useState(!activeTutorial);

  const tutorials: Tutorial[] = [
    {
      id: 'welcome',
      title: 'Welcome Tour',
      description: 'Get familiar with your client portal and its main features',
      steps: [
        {
          id: 'welcome-1',
          title: 'Welcome to Your AI Portal!',
          content: 'This portal is your central hub for tracking your AI project progress, accessing documents, and communicating with your project team. Let\'s take a quick tour of the key features.',
          placement: 'bottom'
        },
        {
          id: 'welcome-2',
          title: 'Navigation Sidebar',
          content: 'Use the sidebar to navigate between different sections of your portal. You can access your dashboard, documents, project chat, and settings from here.',
          target: '[data-tutorial="sidebar"]',
          placement: 'right'
        },
        {
          id: 'welcome-3',
          title: 'Project Dashboard',
          content: 'Your dashboard shows key project metrics, progress tracking, and recent activity. This is your go-to place for a quick project overview.',
          target: '[data-tutorial="dashboard"]',
          placement: 'bottom'
        },
        {
          id: 'welcome-4',
          title: 'Search Functionality',
          content: 'Use the search bar to quickly find documents, messages, or any content within your portal.',
          target: '[data-tutorial="search"]',
          placement: 'bottom'
        },
        {
          id: 'welcome-5',
          title: 'Notifications',
          content: 'Stay updated with project notifications. Click the bell icon to see recent updates and important announcements.',
          target: '[data-tutorial="notifications"]',
          placement: 'bottom'
        }
      ]
    },
    {
      id: 'dashboard',
      title: 'Dashboard Tour',
      description: 'Learn how to read and interpret your project metrics and progress indicators',
      steps: [
        {
          id: 'dashboard-1',
          title: 'Key Metrics Overview',
          content: 'These cards show your most important project metrics at a glance: progress percentage, timeline, budget utilization, and team activity.',
          target: '[data-tutorial="metrics"]',
          placement: 'bottom'
        },
        {
          id: 'dashboard-2',
          title: 'Project Timeline',
          content: 'Track your project phases and milestones. Green checkmarks indicate completed phases, blue shows current work, and gray represents upcoming tasks.',
          target: '[data-tutorial="timeline"]',
          placement: 'top'
        },
        {
          id: 'dashboard-3',
          title: 'Quick Actions',
          content: 'Access frequently used features quickly. View documents, send messages, or schedule meetings without navigating away from the dashboard.',
          target: '[data-tutorial="quick-actions"]',
          placement: 'left'
        },
        {
          id: 'dashboard-4',
          title: 'Recent Activity Feed',
          content: 'Stay informed about recent project updates, document changes, and team activities. The colored dots indicate different types of activities.',
          target: '[data-tutorial="activity-feed"]',
          placement: 'left'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Document Navigation',
      description: 'Learn how to access, view, and work with your project documents',
      steps: [
        {
          id: 'documents-1',
          title: 'Document Library',
          content: 'All your project documents are organized here. Each document is categorized and includes a brief preview to help you find what you need quickly.',
          placement: 'top'
        },
        {
          id: 'documents-2',
          title: 'Document Categories',
          content: 'Documents are organized into categories: Project Planning, Technical Information, and Project Management. This helps you find relevant information faster.',
          placement: 'top'
        },
        {
          id: 'documents-3',
          title: 'Document Preview',
          content: 'Click on any document to view its full content. You can read, download, or print documents as needed for your reference.',
          placement: 'top'
        },
        {
          id: 'documents-4',
          title: 'Search Documents',
          content: 'Use the search function to find specific information across all your documents. Search by title, content, or keywords.',
          placement: 'top'
        }
      ]
    },
    {
      id: 'communication',
      title: 'Communication Features',
      description: 'Learn how to communicate with your project team and track conversations',
      steps: [
        {
          id: 'communication-1',
          title: 'Project Chat',
          content: 'Use the project chat to communicate directly with Daniel and your project team. Messages are organized chronologically and saved for your reference.',
          placement: 'top'
        },
        {
          id: 'communication-2',
          title: 'Sending Messages',
          content: 'Type your message in the input field and click send. You can ask questions, provide feedback, or request updates at any time.',
          placement: 'top'
        },
        {
          id: 'communication-3',
          title: 'File Attachments',
          content: 'Share files, screenshots, or documents by clicking the attachment button. This helps provide context for your questions or feedback.',
          placement: 'top'
        },
        {
          id: 'communication-4',
          title: 'Response Times',
          content: 'Daniel typically responds within 24 hours during business days. Urgent matters can be escalated by marking them as high priority.',
          placement: 'top'
        }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Usage',
      description: 'Learn how to use the portal effectively on mobile devices',
      steps: [
        {
          id: 'mobile-1',
          title: 'Mobile Navigation',
          content: 'On mobile devices, use the hamburger menu (three lines) to access the navigation sidebar. All features are optimized for mobile use.',
          placement: 'bottom'
        },
        {
          id: 'mobile-2',
          title: 'Touch Interactions',
          content: 'Tap to select items, swipe to scroll through content, and use pinch-to-zoom for detailed document viewing.',
          placement: 'bottom'
        },
        {
          id: 'mobile-3',
          title: 'Responsive Design',
          content: 'The portal automatically adapts to your screen size. Cards stack vertically on smaller screens for easier reading and interaction.',
          placement: 'bottom'
        },
        {
          id: 'mobile-4',
          title: 'Offline Access',
          content: 'Recently viewed documents are cached for offline viewing. You can read previously accessed content even without an internet connection.',
          placement: 'bottom'
        }
      ]
    }
  ];

  const currentTutorial = tutorials.find(t => t.id === selectedTutorial);
  const currentStepData = currentTutorial?.steps[currentStep];

  useEffect(() => {
    if (activeTutorial && activeTutorial !== selectedTutorial) {
      setSelectedTutorial(activeTutorial);
      setCurrentStep(0);
      setShowTutorialList(false);
    }
  }, [activeTutorial]);

  const handleNext = () => {
    if (currentTutorial && currentStep < currentTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    if (onComplete && selectedTutorial) {
      onComplete(selectedTutorial);
    }
    onClose();
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  const startTutorial = (tutorialId: string) => {
    setSelectedTutorial(tutorialId);
    setCurrentStep(0);
    setShowTutorialList(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-600">
        {showTutorialList ? (
          // Tutorial Selection Screen
          <div>
            <div className="p-6 border-b border-slate-600 bg-gradient-to-r from-cyan-500 to-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Interactive Tutorials</h2>
                  <p className="text-white/90">Choose a tutorial to get started</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {tutorials.map((tutorial) => (
                  <button
                    key={tutorial.id}
                    onClick={() => startTutorial(tutorial.id)}
                    className="w-full p-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-all hover:scale-105 border border-slate-600 hover:border-cyan-500/50 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {tutorial.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">{tutorial.description}</p>
                        <p className="text-gray-500 text-xs mt-2">{tutorial.steps.length} steps</p>
                      </div>
                      <Play className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Tutorial Content Screen
          <div>
            <div className="p-6 border-b border-slate-600 bg-gradient-to-r from-cyan-500 to-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{currentTutorial?.title}</h2>
                  <p className="text-white/90 text-sm">
                    Step {currentStep + 1} of {currentTutorial?.steps.length}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowTutorialList(true)}
                    className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                    title="Back to tutorials"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((currentStep + 1) / (currentTutorial?.steps.length || 1)) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              {currentStepData && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {currentStepData.title}
                    </h3>
                    <div className="text-gray-300 leading-relaxed">
                      {currentStepData.content}
                    </div>
                  </div>

                  {/* Tutorial Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-600">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleRestart}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        title="Restart tutorial"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Restart</span>
                      </button>
                      
                      <button
                        onClick={handleSkip}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <SkipForward className="w-4 h-4" />
                        <span className="text-sm">Skip Tutorial</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="flex items-center space-x-2 px-4 py-2 border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      
                      <button
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all"
                      >
                        <span>
                          {currentTutorial && currentStep === currentTutorial.steps.length - 1 
                            ? 'Complete' 
                            : 'Next'
                          }
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialSystem;