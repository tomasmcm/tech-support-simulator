import React, { useState, useEffect } from 'react'

const diagnosticItems = [
  "Memory Usage Analysis",
  "CPU Performance Check",
  "Disk Space Verification",
  "Network Latency Test",
  "Security Protocol Scan",
  "Driver Status Check",
  "System Log Analysis",
  "Backup Status Verification"
]

const systemMessages = [
  "Analyzing system configuration...",
  "Checking network protocols...",
  "Scanning for vulnerabilities...",
  "Verifying system integrity...",
  "Running performance diagnostics...",
  "Checking security protocols...",
  "Analyzing memory usage patterns...",
  "Verifying disk health status..."
]

function App() {
  const [systemScan, setSystemScan] = useState(0)
  const [networkScan, setNetworkScan] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [selectedDiagnostics, setSelectedDiagnostics] = useState([])
  const [systemStatus, setSystemStatus] = useState({
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(0, Math.min(100, prev.disk + (Math.random() - 0.5) * 2))
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const startScan = () => {
    setIsScanning(true)
    setSystemScan(0)
    setNetworkScan(0)
    setLogs([])
    
    const interval = setInterval(() => {
      setSystemScan(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          addLog("Scan completed successfully", "success")
          return 100
        }
        if (Math.random() > 0.7) {
          addLog(systemMessages[Math.floor(Math.random() * systemMessages.length)])
        }
        return prev + Math.random() * 15
      })
      setNetworkScan(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 10
      })
    }, 300)
  }

  const addLog = (message, type = "info") => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }])
  }

  const handleChat = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    addLog(`User Query: ${chatInput}`, "warning")
    setChatInput('')

    setTimeout(() => {
      addLog("Analyzing query...", "info")
      setTimeout(() => {
        addLog("Running diagnostic checks...", "info")
        setTimeout(() => {
          addLog("Solution found: Try running system verification", "success")
        }, 1000)
      }, 800)
    }, 500)
  }

  const toggleDiagnostic = (item) => {
    setSelectedDiagnostics(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  return (
    <div className="container">
      <div className="panel">
        <div className="panel-header">
          <h2>System Diagnostics</h2>
          <button className="button" onClick={startScan} disabled={isScanning}>
            {isScanning ? 'SCANNING...' : 'START SCAN'}
          </button>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${systemScan}%` }} />
        </div>
        <p className="status-text">
          System Integrity: {Math.min(100, Math.round(systemScan))}%
        </p>
        <div className="data-grid">
          <div className="data-item">
            CPU: {Math.round(systemStatus.cpu)}%
          </div>
          <div className="data-item">
            Memory: {Math.round(systemStatus.memory)}%
          </div>
          <div className="data-item">
            Disk: {Math.round(systemStatus.disk)}%
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Network Analysis</h2>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${networkScan}%` }} />
        </div>
        <p className="status-text">
          Network Status: {Math.min(100, Math.round(networkScan))}%
        </p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Diagnostic Tools</h2>
        </div>
        <ul className="diagnostic-list">
          {diagnosticItems.map((item, index) => (
            <li 
              key={index}
              className="diagnostic-item"
              onClick={() => toggleDiagnostic(item)}
              style={{
                background: selectedDiagnostics.includes(item) 
                  ? 'rgba(0, 255, 0, 0.1)' 
                  : 'var(--bg-dark)'
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>System Recovery</h2>
        </div>
        <button className="button" style={{ marginBottom: '10px' }}>
          REPAIR SYSTEM
        </button>
        <button className="button" style={{ marginBottom: '10px' }}>
          RESTORE BACKUP
        </button>
        <button className="button">
          INITIALIZE RECOVERY
        </button>
      </div>

      <div className="panel panel-large">
        <div className="panel-header">
          <h2>System Logs</h2>
        </div>
        <div className="chat-container">
          {logs.map((log, index) => (
            <div key={index} className={`log-entry ${log.type}`}>
              [{log.timestamp}] {log.message}
            </div>
          ))}
        </div>
        <form onSubmit={handleChat} className="chat-input">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Enter diagnostic query..."
          />
          <button type="submit" className="button">Send</button>
        </form>
      </div>
    </div>
  )
}

export default App
