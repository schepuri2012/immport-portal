## ------------------------------------------------------------------------
library(scales)
library(ggplot2)
library(reshape)

## ------------------------------------------------------------------------
subject <- read.table(file=paste(getwd(),"/Data/SDY212/Tab/subject.txt",sep=""), header=TRUE, sep="\t", stringsAsFactors=FALSE)
arm_2_subject <- read.table(file=paste(getwd(),"/Data/SDY212/Tab/arm_2_subject.txt",sep="") ,header=TRUE, sep="\t", stringsAsFactors=FALSE)
arm_or_cohort <- read.table(file=paste(getwd(),"/Data/SDY212/Tab/arm_or_cohort.txt",sep=""), header=TRUE, sep="\t", stringsAsFactors=FALSE)

## ------------------------------------------------------------------------
subject[1:3,]
arm_2_subject[1:3,]
arm_or_cohort

## ------------------------------------------------------------------------
unique(arm_2_subject[,"AGE_UNIT"])

## ------------------------------------------------------------------------
merged1 <- merge(arm_or_cohort, arm_2_subject, by=intersect(colnames(arm_or_cohort),colnames(arm_2_subject)),all=TRUE)
subjects.merged <- merge(merged1, subject, by=c("SUBJECT_ACCESSION","WORKSPACE_ID"),all=TRUE)

## ------------------------------------------------------------------------
subjects.merged <- subjects.merged[,c('SUBJECT_ACCESSION', 'ARM_ACCESSION', 'DESCRIPTION.x', 'GENDER', 'RACE', 'MIN_SUBJECT_AGE')]
subjects.merged <- cbind(subjects.merged,ARM_NAME=NA)
subjects.merged[which(subjects.merged$ARM_ACCESSION == "ARM894"),"ARM_NAME"] <- "Young"
subjects.merged[which(subjects.merged$ARM_ACCESSION == "ARM895"),"ARM_NAME"] <- "Old"

## ------------------------------------------------------------------------
hai_result <- read.table(file=paste(getwd(), "/Data/SDY212/Tab/hai_result.txt",sep=""), header=TRUE, sep="\t", stringsAsFactors=FALSE)
head(hai_result)

## ------------------------------------------------------------------------
hai.result.subset <- hai_result[,c("ARM_ACCESSION", "SUBJECT_ACCESSION", "STUDY_TIME_COLLECTED", "VALUE_PREFERRED", "VIRUS_STRAIN_REPORTED")]
hai.result.merged <- merge(hai.result.subset, subjects.merged, by=c("SUBJECT_ACCESSION","ARM_ACCESSION"))
hai.results <- cast(hai.result.merged, SUBJECT_ACCESSION + MIN_SUBJECT_AGE + GENDER + RACE + VIRUS_STRAIN_REPORTED + ARM_ACCESSION + ARM_NAME ~ STUDY_TIME_COLLECTED, value='VALUE_PREFERRED')
colnames(hai.results)[which(colnames(hai.results)=="0")] <- "Day0"
colnames(hai.results)[which(colnames(hai.results)=="28")] <- "Day28"

## ------------------------------------------------------------------------
hai.results.SDY212 <- cbind(hai.results, fold.change= hai.results[,"Day28"] / hai.results[,"Day0"])

## ------------------------------------------------------------------------
length(unique(subjects.merged[,"SUBJECT_ACCESSION"]))
length(unique(hai.results.SDY212[,"SUBJECT_ACCESSION"]))

## ------------------------------------------------------------------------
subjects.HAI <- unique(hai.results.SDY212[,c("SUBJECT_ACCESSION", "MIN_SUBJECT_AGE", "GENDER", "RACE","ARM_NAME")])

## ------------------------------------------------------------------------
table(subjects.HAI$ARM_NAME)
table(subjects.HAI$GENDER)
table(subjects.HAI$RACE)

## ----fig.width=7, fig.height=5-------------------------------------------
ggplot(data=subjects.HAI, aes(x=ARM_NAME,fill=GENDER)) + geom_bar(stat="count", position=position_dodge(), colour="black")
ggplot(data=subjects.HAI, aes(x=ARM_NAME,fill=RACE)) + geom_bar(stat="count", position=position_dodge(), colour="black")
ggplot(data=subjects.HAI, aes(x=GENDER,y=MIN_SUBJECT_AGE)) + geom_boxplot() + geom_point(aes(color=RACE),position=position_jitter(width=0.25,height=.1)) + theme(axis.text.x=element_text(angle=50, vjust=1.2,hjust=1.2)) + facet_wrap(~ ARM_NAME,ncol=2)

## ----fig.width=6.8, fig.height=5-----------------------------------------
ggplot(hai.results.SDY212, aes(x=Day0, y=Day28, color=VIRUS_STRAIN_REPORTED)) + 
    	scale_y_continuous(trans=log2_trans()) + scale_x_continuous(trans=log2_trans()) +
			geom_point(position=position_jitter(width=0.1,height=.1)) +
			ylab("HAI titer post vaccination") + xlab("HAI titer pre vaccination")

## ----fig.width=6.8, fig.height=5-----------------------------------------
ggplot(hai.results.SDY212, aes(x=Day0, y=fold.change, color=VIRUS_STRAIN_REPORTED)) + 
    	scale_y_continuous(trans=log2_trans()) + scale_x_continuous(trans=log2_trans()) +
			geom_point(position=position_jitter(width=0.1,height=.1)) +
			geom_hline(aes(yintercept=4), colour="#BB0000", linetype="dashed") +
			ylab("HAI response (post/pre)") + xlab("HAI titer pre vaccination") +
  	  annotate("text", label = "High responders", x = 900, y = 5, size = 3.5) + annotate("text", label = "Low responders", x = 900, y = 3.1, size = 3.5)

## ----fig.width=4, fig.height=4-------------------------------------------
ggplot(hai.results.SDY212, aes(x=VIRUS_STRAIN_REPORTED, y=fold.change)) + geom_boxplot() + xlab("") + theme(legend.position="none") + geom_point(aes(color=VIRUS_STRAIN_REPORTED),position=position_jitter(width=0.25,height=.2)) + scale_y_continuous(trans=log2_trans())+ ylab("HAI response (Post vaccination/Pre vaccination)")

## ----fig.width=4, fig.height=4-------------------------------------------
ggplot(hai.results.SDY212, aes(x=ARM_NAME, y=fold.change)) + geom_boxplot() + xlab("") + theme(legend.position="none") + geom_point(aes(color=ARM_NAME),position=position_jitter(width=0.25,height=.2)) + scale_y_continuous(trans=log2_trans())+ ylab("HAI response (Post vaccination/Pre vaccination)")

## ----fig.width=6, fig.height=4-------------------------------------------
ggplot(hai.results.SDY212, aes(x=ARM_NAME, y=fold.change)) + geom_boxplot() + xlab("") + theme(legend.position="none") + geom_point(aes(color=VIRUS_STRAIN_REPORTED),position=position_jitter(width=0.25,height=.2)) + scale_y_continuous(trans=log2_trans())+ ylab("HAI response (Post vaccination/Pre vaccination)") + facet_wrap(~ VIRUS_STRAIN_REPORTED)

## ------------------------------------------------------------------------
wilcox.test(hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="B" & hai.results.SDY212[,"ARM_NAME"]=="Young"),"fold.change"],	hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="B" & hai.results.SDY212[,"ARM_NAME"]=="Old"),"fold.change"])
wilcox.test(hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H1N1" & hai.results.SDY212[,"ARM_NAME"]=="Young"),"fold.change"],  hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H1N1" & hai.results.SDY212[,"ARM_NAME"]=="Old"),"fold.change"])
wilcox.test(hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H3N2" & hai.results.SDY212[,"ARM_NAME"]=="Young"),"fold.change"],  hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H3N2" & hai.results.SDY212[,"ARM_NAME"]=="Old"),"fold.change"])

