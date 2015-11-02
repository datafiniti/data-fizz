namespace HtmlParser
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnLoadDirectory = new System.Windows.Forms.Button();
            this.lblPathFolder = new System.Windows.Forms.Label();
            this.btnParse = new System.Windows.Forms.Button();
            this.btnLoadFilesFromPath = new System.Windows.Forms.Button();
            this.listLog = new System.Windows.Forms.ListBox();
            this.SuspendLayout();
            // 
            // btnLoadDirectory
            // 
            this.btnLoadDirectory.Location = new System.Drawing.Point(12, 17);
            this.btnLoadDirectory.Name = "btnLoadDirectory";
            this.btnLoadDirectory.Size = new System.Drawing.Size(80, 26);
            this.btnLoadDirectory.TabIndex = 0;
            this.btnLoadDirectory.Text = "Load Folder";
            this.btnLoadDirectory.UseVisualStyleBackColor = true;
            this.btnLoadDirectory.Click += new System.EventHandler(this.btnLoadDirectory_Click);
            // 
            // lblPathFolder
            // 
            this.lblPathFolder.AutoSize = true;
            this.lblPathFolder.Location = new System.Drawing.Point(109, 24);
            this.lblPathFolder.Name = "lblPathFolder";
            this.lblPathFolder.Size = new System.Drawing.Size(126, 13);
            this.lblPathFolder.TabIndex = 1;
            this.lblPathFolder.Text = "there is not path selected";
            // 
            // btnParse
            // 
            this.btnParse.Location = new System.Drawing.Point(103, 65);
            this.btnParse.Name = "btnParse";
            this.btnParse.Size = new System.Drawing.Size(75, 23);
            this.btnParse.TabIndex = 2;
            this.btnParse.Text = "Parse HTML";
            this.btnParse.UseVisualStyleBackColor = true;
            this.btnParse.Click += new System.EventHandler(this.btnParse_Click);
            // 
            // btnLoadFilesFromPath
            // 
            this.btnLoadFilesFromPath.Location = new System.Drawing.Point(12, 65);
            this.btnLoadFilesFromPath.Name = "btnLoadFilesFromPath";
            this.btnLoadFilesFromPath.Size = new System.Drawing.Size(75, 23);
            this.btnLoadFilesFromPath.TabIndex = 3;
            this.btnLoadFilesFromPath.Text = "Load Files";
            this.btnLoadFilesFromPath.UseVisualStyleBackColor = true;
            this.btnLoadFilesFromPath.Click += new System.EventHandler(this.btnLoadFilesFromPath_Click);
            // 
            // listLog
            // 
            this.listLog.FormattingEnabled = true;
            this.listLog.Location = new System.Drawing.Point(33, 116);
            this.listLog.Name = "listLog";
            this.listLog.Size = new System.Drawing.Size(555, 277);
            this.listLog.TabIndex = 4;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(659, 468);
            this.Controls.Add(this.listLog);
            this.Controls.Add(this.btnLoadFilesFromPath);
            this.Controls.Add(this.btnParse);
            this.Controls.Add(this.lblPathFolder);
            this.Controls.Add(this.btnLoadDirectory);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnLoadDirectory;
        private System.Windows.Forms.Label lblPathFolder;
        private System.Windows.Forms.Button btnParse;
        private System.Windows.Forms.Button btnLoadFilesFromPath;
        private System.Windows.Forms.ListBox listLog;
    }
}

